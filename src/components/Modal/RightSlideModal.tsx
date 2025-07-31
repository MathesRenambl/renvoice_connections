'use client'
import React, { useEffect } from 'react';

interface RightSlideModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const RightSlideModal: React.FC<RightSlideModalProps> = ({
  isOpen,
  onClose,
  children,
  className = 'w-[400px]',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dark Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Slide-in Modal */}
      <div
        className={`relative h-full bg-white shadow-xl overflow-y-auto transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default RightSlideModal;
