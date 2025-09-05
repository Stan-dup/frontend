import React, { useRef, useState } from "react";
import {
  Stage,
  Layer,
  Text,
  Image as KonvaImage,
  Transformer,
} from "react-konva";
import Konva from "konva";

type Item =
  | {
      id: string;
      type: "text";
      x: number;
      y: number;
      text: string;
      fontSize: number;
      isEditing?: boolean;
    }
  | {
      id: string;
      type: "image";
      x: number;
      y: number;
      width: number;
      height: number;
      src: string;
    };

const defaultText = {
  id: "text-" + Date.now(),
  type: "text" as const,
  x: 50,
  y: 50,
  text: "더블클릭하여 편집",
  fontSize: 32,
};

const defaultImage = {
  id: "img-" + Date.now(),
  type: "image" as const,
  x: 150,
  y: 150,
  width: 200,
  height: 200,
  src: "",
};

const PosterMaker: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [editingPos, setEditingPos] = useState<{
    x: number;
    y: number;
    fontSize: number;
    id: string;
  } | null>(null);
  const stageRef = useRef<Konva.Stage | null>(null);
  const trRef = useRef<Konva.Transformer | null>(null);

  // 이미지 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setItems((prev) => [
        ...prev,
        {
          ...defaultImage,
          id: "img-" + Date.now(),
          src: reader.result as string,
        },
      ]);
    };
    reader.readAsDataURL(file);
  };

  // 텍스트 추가
  const handleAddText = () => {
    setItems((prev) => [...prev, { ...defaultText, id: "text-" + Date.now() }]);
  };

  // 선택 핸들러
  const handleSelect = (id: string) => setSelectedId(id);

  // 드래그/변형 핸들러
  const handleDrag = (id: string, x: number, y: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, x, y } : item))
    );
  };

  // 텍스트 더블클릭 편집
  const handleTextDblClick = (item: Item) => {
    if (item.type !== "text") return;
    setEditingText(item.text);
    setEditingPos({
      x: item.x,
      y: item.y,
      fontSize: item.fontSize,
      id: item.id,
    });
    setSelectedId(item.id);
  };

  // 텍스트 편집 완료
  const handleTextEdit = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.type === "text"
          ? { ...item, text: editingText }
          : item
      )
    );
    setEditingText("");
    setEditingPos(null);
  };

  // 이미지 크기 조절
  const handleTransform = (
    id: string,
    node: {
      scaleX: (x?: number) => number;
      scaleY: (y?: number) => number;
      width: () => number;
      height: () => number;
    }
  ) => {
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id && item.type === "image") {
          return {
            ...item,
            width: Math.max(20, node.width() * scaleX),
            height: Math.max(20, node.height() * scaleY),
          };
        }
        return item;
      })
    );
    node.scaleX(1);
    node.scaleY(1);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#f5f5f5" }}>
      <div style={{ marginBottom: 8 }}>
        <button onClick={handleAddText}>텍스트 추가</button>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight - 40}
        ref={stageRef}
        style={{ background: "#fff" }}
      >
        <Layer>
          {items.map((item) => {
            if (item.type === "text") {
              return (
                <Text
                  key={item.id}
                  text={item.text}
                  x={item.x}
                  y={item.y}
                  fontSize={item.fontSize}
                  draggable
                  onClick={() => handleSelect(item.id)}
                  onTap={() => handleSelect(item.id)}
                  onDblClick={() => handleTextDblClick(item)}
                  onDragEnd={(e) =>
                    handleDrag(item.id, e.target.x(), e.target.y())
                  }
                  fill={selectedId === item.id ? "#1976d2" : "#222"}
                />
              );
            }
            if (item.type === "image") {
              return (
                <React.Fragment key={item.id}>
                  <URLImage
                    item={item}
                    isSelected={selectedId === item.id}
                    onSelect={() => handleSelect(item.id)}
                    onDrag={handleDrag}
                    onTransform={handleTransform}
                    trRef={trRef}
                  />
                </React.Fragment>
              );
            }
            return null;
          })}
        </Layer>
      </Stage>
      {/* 텍스트 편집용 input 포탈 */}
      {editingPos && (
        <input
          style={{
            position: "absolute",
            left: editingPos.x,
            top: editingPos.y + 40, // stage 상단 여백 보정
            fontSize: editingPos.fontSize,
            width: 250,
            zIndex: 10,
          }}
          value={editingText}
          autoFocus
          onChange={(e) => setEditingText(e.target.value)}
          onBlur={() => handleTextEdit(editingPos.id)}
          onKeyDown={(e) => e.key === "Enter" && handleTextEdit(editingPos.id)}
        />
      )}
    </div>
  );
};

// 이미지 컴포넌트 (URL to Image)
const URLImage: React.FC<{
  item: Extract<Item, { type: "image" }>;
  isSelected: boolean;
  onSelect: () => void;
  onDrag: (id: string, x: number, y: number) => void;
  onTransform: (id: string, node: Konva.Image) => void;
  trRef: React.RefObject<Konva.Transformer>;
}> = ({ item, isSelected, onSelect, onDrag, onTransform, trRef }) => {
  const shapeRef = useRef<Konva.Image | null>(null);
  const [img, setImg] = useState<HTMLImageElement>();

  React.useEffect(() => {
    const image = new window.Image();
    image.src = item.src;
    image.onload = () => setImg(image);
  }, [item.src]);

  React.useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected, trRef]);

  return (
    <>
      <KonvaImage
        image={img}
        x={item.x}
        y={item.y}
        width={item.width}
        height={item.height}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        onDragEnd={(e) => onDrag(item.id, e.target.x(), e.target.y())}
        onTransformEnd={(e) => onTransform(item.id, e.target as Konva.Image)}
        stroke={isSelected ? "#1976d2" : undefined}
        strokeWidth={isSelected ? 2 : 0}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // 최소 크기 제한
            if (newBox.width < 20 || newBox.height < 20) return oldBox;
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default PosterMaker;
