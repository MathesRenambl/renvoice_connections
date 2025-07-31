import * as React from "react";
import { Dialog, DialogPortal, DialogOverlay, DialogTitle, DialogContent, DialogDescription } from "@radix-ui/react-dialog";
import { X } from "lucide-react";


interface ModalCardProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const SDKModal = ({ open, onClose, title = "", description = "", children }: ModalCardProps) => {

  React.useEffect(() => {
      const handleEscKey = (event: KeyboardEvent) => {
        if (event.key === "Escape" && open) {
          onClose();
        }
      };
  
      if (open) {
        document.addEventListener("keydown", handleEscKey);
        // Prevent body scrolling when modal is open
        document.body.style.overflow = "hidden";
      }
  
      return () => {
        document.removeEventListener("keydown", handleEscKey);
        document.body.style.overflow = "auto";
      };
    }, [open, onClose]);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) onClose();
    }}  >
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black bg-opacity-60 z-30" />
        <DialogContent className="fixed left-1/2 top-1/2  w-auto -translate-x-1/2 -translate-y-1/2 rounded-md bg-gradient-to-br from-gray-900 to-gray-800 p-6 shadow-lg focus:outline-none z-30">
          <DialogTitle className="text-xl font-medium text-white">
            {title}
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm text-gray-200 mb-3">
            {description}
          </DialogDescription>
          <div className="max-h-[70vh] overflow-y-auto scrollbar-hide scroll-hide w-auto">
          {children}
          </div>
          <button className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default SDKModal;