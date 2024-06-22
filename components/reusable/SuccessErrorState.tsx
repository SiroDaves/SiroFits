import { FC } from "react";
import { Button } from "../ui/button";

const imageMapping = {
  success: "/images/success.svg",
  error: "/images/empty.svg",
  empty: "/images/empty.svg",
};

interface SuccessOrErrorStateProps {
  message: string;
  state: "success" | "error" | "empty";
  withAction?: boolean;
  actionLabel?: string;
  onClick?: () => void;
}

export const SuccessOrErrorState: FC<SuccessOrErrorStateProps> = ({
  message,
  state,
  withAction = false,
  actionLabel = "",
  onClick,
}) => {
  const imageSrc = imageMapping[state];
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="py-8 px-4 sm:px-10">
        <div className="flex flex-wrap justify-center">
          <div className="">
            <img
              src={imageSrc}
              alt={`${state} state indicator`}
              className="w-full h-auto"
            />
          </div>
          <div className="mt-3 text-center">
            <p className="text-md text-gray-500">{message}</p>
            {withAction && (
              <div className="mt-2">
                <Button onClick={onClick} type="button">
                  {actionLabel}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
