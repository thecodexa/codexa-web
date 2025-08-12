import { useEffect } from "react";
import IlluminatedText from "../Pages/itext";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-51 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Background Blur */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>

      {/* Modal Content */}
      <div className="relative h-screen animate-fadeIn">
        <IlluminatedText className="absolute top" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-lg p-6 w-full max-w-lg z-10 "
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
