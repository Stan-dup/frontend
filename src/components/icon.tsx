type Props = {
  name: string;
  size?: number;
  weight?: number;
};

const Icon = ({ name, size = 28, weight = 600 }: Props) => {
  return (
    <span
      className="material-symbols-outlined"
      style={{
        fontVariationSettings: `wght ${weight}`,
        fontSize: `${size}px`,
      }}
    >
      {name}
    </span>
  );
};

export default Icon;
