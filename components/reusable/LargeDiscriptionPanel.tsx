import { FC, ReactNode } from "react";

interface DescriptionPanelProps {
  label: string;
  description?: string;
  children?: ReactNode;
}

export const LargeDescriptionPanel: FC<DescriptionPanelProps> = ({
  label,
  description,
  children,
}) => {
  return (
    <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {description && <span className="flex-grow">{description}</span>}
        {children}
      </dd>
    </div>
  );
};
