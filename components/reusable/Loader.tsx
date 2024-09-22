import { FC } from "react";
import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface LoaderProps {
  color?: string;
  size?: number;
}

export const Loader: FC<LoaderProps> = ({ color = "white", size = 10 }) => {
  const sizeClass = `h-${size} w-${size}`;
  const colorClass = `border-${color}-600`;
  return (
    <div
      className={`animate-spin mx-2 rounded-full border-2 tanda-border ${color} ${sizeClass} ${colorClass}`}
    ></div>
  );
};

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export function Spinner() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <div className="sweet-loading">
      <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
      <input value={color} onChange={(input) => setColor(input.target.value)} placeholder="Color of the loader" />

      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
