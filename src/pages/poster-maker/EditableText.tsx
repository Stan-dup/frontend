import React, { useRef, useEffect } from "react";
import { Text, Transformer } from "react-konva";
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

export interface EditableTextProps {
  item: Item;
  isSelected: boolean;
  onSelect: () => void;
  onDrag: (id: string, x: number, y: number) => void;
  onDblClick: (item: Item) => void;
  onTransform?: (id: string, node: Konva.Text) => void;
}

const EditableText: React.FC<EditableTextProps> = ({
  item,
  isSelected,
  onSelect,
  onDrag,
  onDblClick,
  onTransform,
}) => {
  const shapeRef = useRef<Konva.Text | null>(null);
  const trRef = useRef<Konva.Transformer | null>(null);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  if (item.type !== "text") return <></>;

  return (
    <>
      <Text
        ref={shapeRef}
        text={item.textContent}
        x={item.x}
        y={item.y}
        fontSize={item.fontSize}
        fontFamily={item.fontFamily || "inherit"}
        fill={item.color || "#222"}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDblClick={() => onDblClick(item)}
        onDragEnd={(e) => onDrag(item.id, e.target.x(), e.target.y())}
        onTransformEnd={
          onTransform
            ? (e) => onTransform(item.id, e.target as Konva.Text)
            : undefined
        }
        stroke={isSelected ? "#1976d2" : undefined}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          keepRatio={true}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 20 || newBox.height < 20) return oldBox;
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default EditableText;
