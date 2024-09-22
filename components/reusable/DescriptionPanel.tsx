import { FC } from "react";

interface DescriptionPanelProps {
  label: string;
  description?: string;
}

export const DescriptionPanel: FC<DescriptionPanelProps> = ({
  label,
  description,
}) => {
  return (
    <div className='flex flex-col space-y-1 mt-4'>
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm text-gray-500">{description}</span>
    </div>
  );
};
