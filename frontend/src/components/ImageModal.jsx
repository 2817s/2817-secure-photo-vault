import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ImageModal({ photo, onClose }) {
  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-6 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 z-[210] rounded-full bg-white/10 p-3 text-white transition hover:bg-red-500"
          >
            <X size={24} />
          </button>

          {/* Image Container */}
          <motion.div
            className="relative flex max-h-[90vh] max-w-[90vw] items-center justify-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={photo.src}
              alt={photo.title || "Photo"}
              className="max-h-[85vh] max-w-[90vw] rounded-3xl object-contain shadow-2xl"
            />
          </motion.div>

          {/* Image Name */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-2xl bg-black/50 px-6 py-3 backdrop-blur-lg">
            <h2 className="max-w-[80vw] truncate text-xl font-semibold text-white">
              {photo.title || "Untitled Photo"}
            </h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ImageModal;