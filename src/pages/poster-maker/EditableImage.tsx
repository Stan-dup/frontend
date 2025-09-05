import React, { useRef, useState } from "react";
import { Image as KonvaImage, Transformer } from "react-konva";
import Konva from "konva";

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

export const EditableImage: React.FC<{
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
