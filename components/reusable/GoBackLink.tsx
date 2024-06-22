import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface GoBackLinkProps {
  path: string;
  label?: string;
}

export const GoBackLink: FC<GoBackLinkProps> = ({ path, label = "Back" }) => {
  return (
    <Link
      className="flex items-center space-x-1 hover:text-gray-700"
      href={path}
    >
      <MoveLeftIcon className="flex-shrink-0 h-4 w-5" aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
};
