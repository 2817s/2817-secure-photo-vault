import {
  Heart,
  Eye,
  Trash2,
} from "lucide-react";

import { motion } from "framer-motion";

function PhotoCard({
  photo,
  onClick,
  onDelete,
  onFavorite,
}) {
  const handleFavorite = (e) => {
    e.stopPropagation();

    if (onFavorite) {
      onFavorite(photo.id);
    }
  };

  const handleView = (e) => {
    e.stopPropagation();

    if (onClick) {
      onClick();
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();

    if (
      window.confirm(
        "Delete this uploaded photo?"
      )
    ) {
      onDelete(photo.id);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      onClick={handleView}
      className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-slate-900"
    >
      {/* Image */}

      <img
        src={photo.src}
        alt={photo.title}
        className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
      />

      {/* Gradient */}

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

      {/* Action Buttons */}

      <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition duration-300 group-hover:opacity-100">

        {/* Favorite */}

        <button
          type="button"
          onClick={handleFavorite}
          className="rounded-full bg-white/10 p-2 backdrop-blur-lg transition hover:bg-white/20"
        >
          <Heart
            size={18}
            fill={
              photo.favorite
                ? "currentColor"
                : "none"
            }
            className={
              photo.favorite
                ? "text-pink-500"
                : "text-white hover:text-pink-500"
            }
          />
        </button>

        {/* Eye */}

        <button
          type="button"
          onClick={handleView}
          className="rounded-full bg-white/10 p-2 backdrop-blur-lg transition hover:bg-white/20"
        >
          <Eye
            size={18}
            className="text-white hover:text-cyan-400"
          />
        </button>

        {/* Delete */}

        {photo.uploaded && (
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-full bg-red-500/20 p-2 backdrop-blur-lg transition hover:bg-red-500/30"
          >
            <Trash2
              size={18}
              className="text-red-400 hover:text-red-200"
            />
          </button>
        )}
      </div>

      {/* Photo Information */}

      <div className="absolute bottom-0 left-0 right-0 translate-y-10 p-5 transition duration-300 group-hover:translate-y-0">
        <h3 className="text-lg font-semibold text-white">
          {photo.title}
        </h3>

        <p className="text-sm text-slate-300">
          {photo.album}
        </p>
      </div>
    </motion.div>
  );
}

export default PhotoCard;