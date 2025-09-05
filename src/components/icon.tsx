type Props = {
  name: string;
  size?: number;
  weight?: number;
  color?: string;
};

const Icon = ({
  name,
  color = "var(--color-black)",
  size = 28,
  weight = 600,
}: Props) => {
  return (
    <span
      className="material-symbols-outlined"
      style={{
        fontVariationSettings: `wght ${weight}`,
        fontSize: `${size}px`,
        color: color,
      }}
    >
      {name}
    </span>
  );
};

export default Icon;
