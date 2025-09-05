import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Image as KonvaImage, Transformer } from "react-konva";
import EditableText from "@/pages/poster-maker/EditableText";
import Konva from "konva";
import styled from "@emotion/styled";

import { fetchGeneratedPosterInfo, GeneratedPosterInfo } from "./api";
import { Loading } from "@/components/Loading";

type Item =
  | {
      id: string;
      type: "text";
      x: number;
      y: number;
      textContent: string;
      fontSize: number;
      fontFamily?: string;
      color?: string;
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
  textContent: "더블클릭하여 편집",
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

const PosterMaker = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [generatedPosterInfo, setGeneratedPosterInfo] =
    useState<GeneratedPosterInfo>();
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

  // 텍스트 속성 변경 핸들러
  const handleTextStyleChange = (
    key: "color" | "fontSize",
    value: string | number
  ) => {
    if (!selectedId) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === selectedId && item.type === "text"
          ? { ...item, [key]: value }
          : item
      )
    );
  };

  // 드래그/변형 핸들러
  const handleDrag = (id: string, x: number, y: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, x, y } : item))
    );
  };

  // 텍스트 더블클릭 편집
  const handleTextDblClick = (item: Item) => {
    if (item.type !== "text") return;
    setEditingText(item.textContent);
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

  useEffect(() => {
    fetchGeneratedPosterInfo((result) => {
      setGeneratedPosterInfo(result);
    });
  }, []);

  if (generatedPosterInfo === undefined) {
    return <Loading />;
  }

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <button onClick={handleAddText}>텍스트 추가</button>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {/* 텍스트 선택 시 스타일 컨트롤러 */}
        {selectedId &&
          (() => {
            const selected = items.find(
              (i): i is Extract<Item, { type: "text" }> =>
                i.id === selectedId && i.type === "text"
            );
            if (!selected) return null;
            return (
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  background: "#f7f7fa",
                  borderRadius: 8,
                  padding: "4px 12px",
                }}
              >
                <label
                  style={{ display: "flex", alignItems: "center", gap: 4 }}
                >
                  <span style={{ fontSize: 14 }}>색상</span>
                  <input
                    type="color"
                    value={selected.color || "#222222"}
                    onChange={(e) =>
                      handleTextStyleChange("color", e.target.value)
                    }
                    style={{
                      width: 28,
                      height: 28,
                      border: "none",
                      background: "none",
                    }}
                  />
                </label>
                <label
                  style={{ display: "flex", alignItems: "center", gap: 4 }}
                >
                  <span style={{ fontSize: 14 }}>크기</span>
                  <input
                    type="number"
                    min={8}
                    max={120}
                    value={selected.fontSize}
                    onChange={(e) =>
                      handleTextStyleChange("fontSize", Number(e.target.value))
                    }
                    style={{ width: 48 }}
                  />
                </label>
              </div>
            );
          })()}
      </div>
      <CanvasWrapper>
        <BackgroundImage
          src={generatedPosterInfo.img}
          width={generatedPosterInfo.width * generatedPosterInfo.resizeRatio}
          height={generatedPosterInfo.height * generatedPosterInfo.resizeRatio}
        />
        <Stage
          width={generatedPosterInfo.width * generatedPosterInfo.resizeRatio}
          height={generatedPosterInfo.height * generatedPosterInfo.resizeRatio}
          ref={stageRef}
          style={{ background: "#fff" }}
        >
          <Layer>
            {items.map((item) => {
              if (item.type === "text") {
                return (
                  <EditableText
                    key={item.id}
                    item={item}
                    isSelected={selectedId === item.id}
                    onSelect={() => handleSelect(item.id)}
                    onDrag={handleDrag}
                    onDblClick={handleTextDblClick}
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
              left:
                editingPos.x +
                (window.innerWidth -
                  generatedPosterInfo.width * generatedPosterInfo.resizeRatio) /
                  2 -
                10,
              top:
                editingPos.y +
                (window.innerHeight -
                  87 -
                  generatedPosterInfo.height *
                    generatedPosterInfo.resizeRatio) /
                  2 -
                10, // stage 상단 여백 보정
              fontSize: editingPos.fontSize,
              width: 250,
              zIndex: 10,
            }}
            value={editingText}
            autoFocus
            onChange={(e) => setEditingText(e.target.value)}
            onBlur={() => handleTextEdit(editingPos.id)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleTextEdit(editingPos.id)
            }
          />
        )}
      </CanvasWrapper>
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

const CanvasWrapper = styled.div({
  width: "100%",
  height: "calc(100vh - 87px)",
  background: "var(--color-background)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
});
const BackgroundImage = styled.img({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export default PosterMaker;
