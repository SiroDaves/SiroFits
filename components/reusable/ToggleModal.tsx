import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { RefreshCwIcon } from "lucide-react";
import { FC } from "react";

interface ToogleModalProps {
  isOpen: boolean;
  loading?: boolean;
  message: string;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
}

export const ToggleModal: FC<ToogleModalProps> = ({
  isOpen,
  loading = false,
  message,
  onClose,
  onSubmit,
}) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading} onClick={() => onClose()}>
            {loading && <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />}{" "}
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={() => onSubmit()}>
            {loading && <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />}{" "}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
