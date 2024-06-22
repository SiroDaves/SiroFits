import { FC } from "react";

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
