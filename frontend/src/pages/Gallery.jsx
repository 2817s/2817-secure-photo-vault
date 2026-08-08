import { useState, useEffect } from "react";
import { UploadCloud } from "lucide-react";

import GalleryNavbar from "../components/GalleryNavbar";
import AlbumTabs from "../components/AlbumTabs";
import PhotoCard from "../components/PhotoCard";
import ImageModal from "../components/ImageModal";
import UploadButton from "../components/UploadButton";

import { uploadImage } from "../uploadImage";

// ==========================================
// DEFAULT LOCAL IMAGES
// ==========================================

const imageModules = import.meta.glob(
  "../assets/photos/images/*.{jpg,jpeg,png,JPG,JPEG,PNG}",
  {
    eager: true,
    import: "default",
  }
);

const photos = Object.entries(
  imageModules
).map(([path, src], index) => {
  const fileName = path
    .split("/")
    .pop()
    .replace(/\.[^/.]+$/, "");

  let album = "Private";

  const lower = fileName.toLowerCase();

  if (lower.includes("family")) {
    album = "Family";
  } else if (
    lower.includes("vacation")
  ) {
    album = "Vacation";
  } else if (
    lower.includes("favorite")
  ) {
    album = "Favorites";
  }

  return {
    id: index + 1,
    src,
    title: fileName,
    album,
    uploaded: false,
  };
});

// ==========================================
// GALLERY
// ==========================================

function Gallery() {
  // Album
  const [selectedAlbum, setSelectedAlbum] =
    useState("All");

  // Modal
  const [selectedPhoto, setSelectedPhoto] =
    useState(null);

  // Search
  const [searchTerm, setSearchTerm] =
    useState("");

  // Dragging
  const [dragging, setDragging] =
    useState(false);

  // Uploading
  const [uploading, setUploading] =
    useState(false);

  // Progress
  const [uploadProgress, setUploadProgress] =
    useState({});

  // Upload status
  const [uploadStatus, setUploadStatus] =
    useState("");

  // ========================================
  // UPLOADED PHOTOS
  // ========================================

  const [uploadedPhotos, setUploadedPhotos] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            "uploadedPhotos"
          );

        return saved
          ? JSON.parse(saved)
          : [];
      } catch (error) {
        console.error(
          "Could not load uploaded photos:",
          error
        );

        return [];
      }
    });

  // ========================================
  // FAVORITES
  // ========================================

  const [favorites, setFavorites] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            "favorites"
          );

        return saved
          ? JSON.parse(saved)
          : [];
      } catch (error) {
        console.error(
          "Could not load favorites:",
          error
        );

        return [];
      }
    });

  // ========================================
  // SAVE UPLOADED PHOTOS
  // ========================================

  useEffect(() => {
    localStorage.setItem(
      "uploadedPhotos",
      JSON.stringify(uploadedPhotos)
    );
  }, [uploadedPhotos]);

  // ========================================
  // SAVE FAVORITES
  // ========================================

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  // ========================================
  // UPLOAD FILES
  // ========================================

  const handleUploadFiles = async (
    fileList
  ) => {
    const files = Array.from(fileList);

    const imageFiles = files.filter((file) =>
      file.type.startsWith("image/")
    );

    if (imageFiles.length === 0) {
      alert(
        "Please select image files only."
      );

      return;
    }

    setUploading(true);

    setUploadStatus(
      `Uploading 0 of ${imageFiles.length} photos`
    );

    // Create initial progress
    const initialProgress = {};

    imageFiles.forEach((file) => {
      initialProgress[file.name] = 0;
    });

    setUploadProgress(
      initialProgress
    );

    let completed = 0;

    try {
      for (const file of imageFiles) {
        try {
          // --------------------------------
          // Upload to Cloudinary
          // --------------------------------

          const imageUrl =
            await uploadImage(
              file,
              (percent) => {
                setUploadProgress(
                  (prev) => ({
                    ...prev,
                    [file.name]:
                      percent,
                  })
                );
              }
            );

          // --------------------------------
          // Create Photo Object
          // --------------------------------

          const photo = {
            id:
              Date.now() +
              Math.random(),

            src: imageUrl,

            title: file.name.replace(
              /\.[^/.]+$/,
              ""
            ),

            album: "Private",

            uploaded: true,
          };

          // --------------------------------
          // Add to Gallery
          // --------------------------------

          setUploadedPhotos(
            (prev) => [
              ...prev,
              photo,
            ]
          );

          completed += 1;

          setUploadStatus(
            `Uploading ${completed} of ${imageFiles.length} photos`
          );

          setUploadProgress(
            (prev) => ({
              ...prev,
              [file.name]: 100,
            })
          );
        } catch (error) {
          console.error(
            `Failed to upload ${file.name}:`,
            error.response?.data ||
              error.message
          );

          alert(
            `Failed to upload ${file.name}.\n\n${
              error.response?.data
                ?.error?.message ||
              error.message ||
              "Unknown error"
            }`
          );
        }
      }
    } finally {
      setTimeout(() => {
        setUploading(false);

        setUploadProgress({});

        setUploadStatus("");
      }, 1000);
    }
  };

  // ========================================
  // DRAG OVER
  // ========================================

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!uploading) {
      setDragging(true);
    }
  };

  // ========================================
  // DRAG ENTER
  // ========================================

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!uploading) {
      setDragging(true);
    }
  };

  // ========================================
  // DRAG LEAVE
  // ========================================

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);
  };

  // ========================================
  // DROP
  // ========================================

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);

    if (uploading) {
      return;
    }

    const files =
      e.dataTransfer.files;

    if (
      files &&
      files.length > 0
    ) {
      handleUploadFiles(files);
    }
  };

  // ========================================
  // DELETE
  // ========================================

  const handleDelete = (id) => {
    setUploadedPhotos(
      (prev) =>
        prev.filter(
          (photo) =>
            photo.id !== id
        )
    );

    setFavorites(
      (prev) =>
        prev.filter(
          (favId) =>
            favId !== id
        )
    );

    if (
      selectedPhoto?.id === id
    ) {
      setSelectedPhoto(null);
    }
  };

  // ========================================
  // FAVORITE
  // ========================================

  const toggleFavorite = (id) => {
    setFavorites(
      (prev) =>
        prev.includes(id)
          ? prev.filter(
              (item) =>
                item !== id
            )
          : [
              ...prev,
              id,
            ]
    );
  };

  // ========================================
  // ALL PHOTOS
  // ========================================

  const allPhotos = [
    ...photos,
    ...uploadedPhotos,
  ];

  // ========================================
  // FILTER PHOTOS
  // ========================================

  const filteredPhotos =
    allPhotos.filter(
      (photo) => {
        const matchesAlbum =
          selectedAlbum ===
          "All"
            ? true
            : selectedAlbum ===
              "Favorites"
            ? favorites.includes(
                photo.id
              )
            : photo.album ===
              selectedAlbum;

        const matchesSearch =
          photo.title
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            );

        return (
          matchesAlbum &&
          matchesSearch
        );
      }
    );

  // ========================================
  // RENDER
  // ========================================

  return (
    <main className="min-h-screen bg-[#050816]">

      {/* ================================== */}
      {/* NAVBAR */}
      {/* ================================== */}

      <GalleryNavbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* ================================== */}
      {/* ALBUMS */}
      {/* ================================== */}

      <AlbumTabs
        selectedAlbum={
          selectedAlbum
        }
        setSelectedAlbum={
          setSelectedAlbum
        }
      />

      {/* ================================== */}
      {/* MAIN CONTENT */}
      {/* ================================== */}

      <div className="mx-auto mt-16 max-w-7xl px-6">

        {/* ================================= */}
        {/* UPLOAD BUTTON */}
        {/* ================================= */}

        <div className="mb-8 flex justify-end">
          <UploadButton
            onFilesSelected={
              handleUploadFiles
            }
            uploading={
              uploading
            }
          />
        </div>

        {/* ================================= */}
        {/* DROP ZONE */}
        {/* ================================= */}

        <div
          onDragOver={
            handleDragOver
          }
          onDragEnter={
            handleDragEnter
          }
          onDragLeave={
            handleDragLeave
          }
          onDrop={handleDrop}
          className={`mb-10 rounded-3xl border-2 border-dashed p-10 text-center transition ${
            dragging
              ? "border-violet-400 bg-violet-600/20"
              : "border-white/10 bg-slate-900/40 hover:border-violet-500/50"
          }`}
        >
          <UploadCloud
            size={44}
            className="mx-auto mb-4 text-violet-400"
          />

          <h2 className="text-xl font-bold text-white">
            Drag & Drop Photos
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Drop your images here
            or use the Upload
            Photos button.
          </p>
        </div>

        {/* ================================= */}
        {/* FULL SCREEN DROP OVERLAY */}
        {/* ================================= */}

        {dragging && (
          <div className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-[#050816]/70 backdrop-blur-sm">

            <div className="mx-6 w-full max-w-2xl rounded-3xl border-2 border-dashed border-violet-400 bg-violet-600/20 p-16 text-center shadow-2xl">

              <UploadCloud
                size={64}
                className="mx-auto mb-6 text-violet-400"
              />

              <h2 className="text-3xl font-bold text-white">
                Drop Photos Here
              </h2>

              <p className="mt-3 text-slate-400">
                Release your files
                to upload them to
                your vault.
              </p>

            </div>
          </div>
        )}

        {/* ================================= */}
        {/* UPLOAD PROGRESS */}
        {/* ================================= */}

        {uploading && (
          <div className="mb-8 rounded-3xl border border-white/10 bg-slate-900/80 p-6">

            <div className="mb-5 flex items-center justify-between">

              <div>
                <h2 className="text-lg font-bold text-white">
                  Uploading Photos
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {uploadStatus}
                </p>
              </div>

              <UploadCloud
                size={24}
                className="text-violet-400"
              />
            </div>

            <div className="space-y-4">

              {Object.entries(
                uploadProgress
              ).map(
                ([
                  fileName,
                  progress,
                ]) => (
                  <div
                    key={fileName}
                  >
                    <div className="mb-2 flex items-center justify-between">

                      <p className="max-w-[70%] truncate text-sm text-slate-300">
                        {fileName}
                      </p>

                      <span className="text-sm font-semibold text-violet-400">
                        {progress}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">

                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-600 to-purple-400 transition-all duration-300"
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* ================================= */}
        {/* GALLERY */}
        {/* ================================= */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {filteredPhotos.map(
            (photo) => (
              <PhotoCard
                key={photo.id}
                photo={{
                  ...photo,

                  favorite:
                    favorites.includes(
                      photo.id
                    ),
                }}
                onClick={() =>
                  setSelectedPhoto(
                    photo
                  )
                }
                onDelete={
                  handleDelete
                }
                onFavorite={
                  toggleFavorite
                }
              />
            )
          )}
        </div>

        {/* ================================= */}
        {/* EMPTY STATE */}
        {/* ================================= */}

        {filteredPhotos.length ===
          0 && (
          <div className="py-32 text-center">

            <h2 className="text-3xl font-bold text-white">
              No Photos Found
            </h2>

            <p className="mt-3 text-slate-400">
              Try another search
              or select another
              album.
            </p>

          </div>
        )}
      </div>

      {/* ================================== */}
      {/* IMAGE MODAL */}
      {/* ================================== */}

      <ImageModal
        photo={selectedPhoto}
        onClose={() =>
          setSelectedPhoto(
            null
          )
        }
      />

    </main>
  );
}

export default Gallery;