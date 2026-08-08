import {
  Image,
  Heart,
  Upload,
  FolderOpen,
  ArrowLeft,
  Images,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import default gallery images
const imageModules = import.meta.glob(
  "../assets/photos/images/*.{jpg,jpeg,png,JPG,JPEG,PNG}",
  {
    eager: true,
    import: "default",
  }
);

// Build default photos
const defaultPhotos = Object.entries(imageModules).map(
  ([path, src], index) => {
    const fileName = path
      .split("/")
      .pop()
      .replace(/\.[^/.]+$/, "");

    const lower = fileName.toLowerCase();

    let album = "Private";

    if (lower.includes("family")) {
      album = "Family";
    } else if (lower.includes("vacation")) {
      album = "Vacation";
    } else if (lower.includes("favorite")) {
      album = "Favorites";
    }

    return {
      id: index + 1,
      src,
      title: fileName,
      album,
      uploaded: false,
    };
  }
);

function Dashboard() {
  const navigate = useNavigate();

  // Uploaded photos
  const uploadedPhotos = JSON.parse(
    localStorage.getItem("uploadedPhotos") || "[]"
  );

  // Favorites
  const favorites = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );

  // Combine default + uploaded photos
  const allPhotos = [...defaultPhotos, ...uploadedPhotos];

  // --------------------------------------------------
  // AVAILABLE ALBUMS
  // --------------------------------------------------

  const availableAlbums = [
    "Family",
    "Vacation",
    "Private",
    "Favorites",
  ];

  // --------------------------------------------------
  // ALBUMS THAT ACTUALLY CONTAIN PHOTOS
  // --------------------------------------------------

  const albumsWithPhotos = [
    ...new Set(
      allPhotos
        .filter((photo) => photo.album)
        .map((photo) => photo.album)
    ),
  ];

  // Total available albums
  const totalAvailableAlbums = availableAlbums.length;

  // Total photos
  const totalPhotos = allPhotos.length;

  // --------------------------------------------------
  // DASHBOARD STATISTICS
  // --------------------------------------------------

  const stats = [
    {
      title: "Total Photos",
      value: totalPhotos,
      icon: Image,
      description: "Photos in your vault",
    },

    {
      title: "Favorites",
      value: favorites.length,
      icon: Heart,
      description: "Saved favorites",
    },

    {
      title: "Uploaded",
      value: uploadedPhotos.length,
      icon: Upload,
      description: "Cloudinary uploads",
    },

    {
      title: "Albums",
      value: albumsWithPhotos.length,
      icon: FolderOpen,
      description: `${totalAvailableAlbums} total available albums`,
    },
  ];

  // --------------------------------------------------
  // RECENT UPLOADS
  // --------------------------------------------------

  const recentUploads = uploadedPhotos
    .slice(-6)
    .reverse();

  // --------------------------------------------------
  // LOCK VAULT
  // --------------------------------------------------

  const handleLockVault = () => {
    localStorage.removeItem("vaultUnlocked");
    navigate("/unlock");
  };

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-10 text-white sm:px-10">

      <div className="mx-auto max-w-7xl">

        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">

          <div>

            <p className="mb-2 text-sm font-medium text-violet-400">
              2817 VAULT
            </p>

            <h1 className="text-4xl font-extrabold sm:text-5xl">
              Dashboard
            </h1>

            <p className="mt-3 text-slate-400">
              Overview of your private photo collection.
            </p>

          </div>

          {/* Header Buttons */}

          <div className="flex flex-wrap gap-3">

            {/* Back to Gallery */}

            <button
              onClick={() => navigate("/gallery")}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 px-5 py-3 font-semibold text-white transition hover:border-violet-500 hover:bg-violet-600"
            >
              <ArrowLeft size={18} />
              Back to Gallery
            </button>

            {/* Lock Vault */}

            <button
              onClick={handleLockVault}
              className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
            >
              <Lock size={18} />
              Lock Vault
            </button>

          </div>

        </div>

        {/* ========================================= */}
        {/* STATISTICS */}
        {/* ========================================= */}

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat) => {

            const Icon = stat.icon;

            return (

              <div
                key={stat.title}
                className="group rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-500/40"
              >

                {/* Icon Row */}

                <div className="mb-5 flex items-center justify-between">

                  <div className="rounded-2xl bg-violet-600/15 p-4 text-violet-400">

                    <Icon size={28} />

                  </div>

                  <Images
                    size={20}
                    className="text-slate-700 transition group-hover:text-slate-500"
                  />

                </div>

                {/* Title */}

                <p className="text-sm text-slate-400">
                  {stat.title}
                </p>

                {/* Number */}

                <h2 className="mt-2 text-4xl font-bold">
                  {stat.value}
                </h2>

                {/* Description */}

                <p className="mt-2 text-sm text-slate-500">
                  {stat.description}
                </p>

                {/* Extra Album Information */}

                {stat.title === "Albums" && (
                  <p className="mt-1 text-xs text-violet-400">
                    {albumsWithPhotos.length} currently in use
                  </p>
                )}

              </div>

            );

          })}

        </div>

        {/* ========================================= */}
        {/* RECENT UPLOADS */}
        {/* ========================================= */}

        <section className="mt-10 rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl sm:p-8">

          {/* Section Header */}

          <div className="mb-8 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold">
                Recent Uploads
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Your latest photos uploaded to the vault.
              </p>

            </div>

            <button
              onClick={() => navigate("/gallery")}
              className="hidden rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold transition hover:bg-violet-500 sm:block"
            >
              View Gallery
            </button>

          </div>

          {/* ======================================= */}
          {/* NO UPLOADS */}
          {/* ======================================= */}

          {recentUploads.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center">

              <Upload
                size={40}
                className="mx-auto mb-4 text-slate-600"
              />

              <h3 className="text-lg font-semibold">
                No uploads yet
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Upload your first photo to see it here.
              </p>

              <button
                onClick={() => navigate("/gallery")}
                className="mt-6 rounded-xl bg-violet-600 px-5 py-3 font-semibold transition hover:bg-violet-500"
              >
                Upload a Photo
              </button>

            </div>

          ) : (

            /* ===================================== */
            /* RECENT UPLOAD GRID */
            /* ===================================== */

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {recentUploads.map((photo) => (

                <button
                  key={photo.id}
                  onClick={() => navigate("/gallery")}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-950 text-left"
                >

                  {/* Image */}

                  <div className="overflow-hidden">

                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                  </div>

                  {/* Details */}

                  <div className="p-4">

                    <h3 className="truncate font-semibold text-white">
                      {photo.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {photo.album}
                    </p>

                  </div>

                </button>

              ))}

            </div>

          )}

        </section>

        {/* ========================================= */}
        {/* QUICK ACTIONS */}
        {/* ========================================= */}

        <section className="mt-10 grid gap-6 md:grid-cols-2">

          {/* Open Gallery */}

          <button
            onClick={() => navigate("/gallery")}
            className="group rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600/20 to-purple-600/5 p-8 text-left transition hover:border-violet-500/40"
          >

            <Image
              size={32}
              className="mb-5 text-violet-400"
            />

            <h2 className="text-2xl font-bold">
              Open Gallery
            </h2>

            <p className="mt-2 text-slate-400">
              Browse, search, favorite and manage your photos.
            </p>

            <span className="mt-6 inline-block text-sm font-semibold text-violet-400">
              Go to Gallery →
            </span>

          </button>

          {/* Favorites */}

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-600/15 to-blue-600/5 p-8">

            <Heart
              size={32}
              className="mb-5 text-pink-400"
            />

            <h2 className="text-2xl font-bold">
              Your Favorites
            </h2>

            <p className="mt-2 text-slate-400">

              You currently have{" "}

              <span className="font-semibold text-white">
                {favorites.length}
              </span>{" "}

              favorite photo
              {favorites.length === 1 ? "" : "s"}.

            </p>

            <button
              onClick={() => navigate("/gallery")}
              className="mt-6 text-sm font-semibold text-pink-400"
            >
              View Favorites →
            </button>

          </div>

        </section>

      </div>

    </main>
  );
}

export default Dashboard;