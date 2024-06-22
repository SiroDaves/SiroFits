import { FC } from "react";

interface DescriptionPanelProps {
  label: string;
  description?: string;
}

export const VerticalDescriptionPanel: FC<DescriptionPanelProps> = ({
  label,
  description,
}) => {
  return (
    <div className=" flex flex-col -space-y-1">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm text-gray-500">{description}</span>
    </div>
  );
};
