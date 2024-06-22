import { FC, ReactNode } from "react";

interface DescriptionPanelProps {
  label: string;
  description?: string;
  children?: ReactNode;
}

export const DescriptionPanel: FC<DescriptionPanelProps> = ({
  label,
  description,
  children,
}) => {
  return (
    <div className="py-1 sm:grid sm:py-2 sm:grid-cols-3 sm:gap-2 items-center">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {description && <span className="flex-grow">{description}</span>}
        {children}
      </dd>
    </div>
  );
};
