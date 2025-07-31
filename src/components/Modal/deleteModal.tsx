import * as React from "react";
import { Dialog, DialogPortal, DialogOverlay, DialogContent } from "@radix-ui/react-dialog";
import { AlertTriangle, Trash2, X, CheckCircle } from "lucide-react";

type ModalVariant = 'delete' | 'confirm';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  variant?: ModalVariant;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  Icon?: React.ElementType;
  showButtons?: boolean;
}

const VARIANTS = {
  delete: {
    title: "Delete Item",
    message: "Are you sure you want to delete this item? This action cannot be undone.",
    confirmText: "Delete",
    Icon: AlertTriangle,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    confirmBg: "bg-red-600 hover:bg-red-700",
    confirmRing: "focus:ring-red-500"
  },
  confirm: {
    title: "Confirm Action",
    message: "Are you sure you want to proceed with this action?",
    confirmText: "Confirm",
    Icon: CheckCircle,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    confirmBg: "bg-blue-600 hover:bg-blue-700",
    confirmRing: "focus:ring-blue-500"
  }
};

const Modal = ({
  open,
  onClose,
  onConfirm,
  variant = 'delete',
  title,
  message,
  confirmText,
  cancelText = "Cancel",
  Icon,
  showButtons = true
}: ModalProps) => {
  const config = VARIANTS[variant];
  
  React.useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) onClose();
    };

    if (open) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  const CurrentIcon = Icon || config.Icon;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black bg-opacity-60 z-30" />
        <DialogContent className="fixed left-1/2 top-1/2 max-h-[82vh] overflow-y-auto scrollbar-hide w-[35vw] min-w-96 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg focus:outline-none z-30">
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          <div className="text-center">
            <div className="flex items-center mb-4 gap-3">
              <div className={`${config.iconBg} rounded-full flex items-center justify-center w-16 h-16`}>
                <CurrentIcon className={`w-8 h-8 ${config.iconColor}`} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">
                {title || config.title}
              </h3>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {message || config.message}
            </p>

            {showButtons && (
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className={`flex-1 px-6 py-3 ${config.confirmBg} text-white rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 ${config.confirmRing} focus:ring-offset-2 flex items-center justify-center gap-2`}
                >
                  {variant === 'delete' && <Trash2 className="w-4 h-4" />}
                  {confirmText || config.confirmText}
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default Modal;