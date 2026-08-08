import { Search, LockKeyhole, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";

function GalleryNavbar({
  searchTerm,
  setSearchTerm,
}) {
  const navigate = useNavigate();

  const handleLockVault = () => {
    sessionStorage.removeItem("vaultUnlocked");

    navigate("/unlock", {
      replace: true,
    });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-5">

        {/* Logo */}

        <button
          type="button"
          onClick={() => navigate("/gallery")}
          className="shrink-0 text-2xl font-extrabold text-white transition hover:text-violet-400"
        >
          2817 Vault
        </button>

        {/* Search */}

        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            placeholder="Search your photos..."
            className="w-full rounded-xl border border-white/10 bg-slate-900/70 py-3 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500"
          />
        </div>

        {/* Dashboard Button */}

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="flex shrink-0 items-center gap-2 rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-3 font-semibold text-violet-400 transition hover:bg-violet-600 hover:text-white"
        >
          <LayoutDashboard size={19} />

          <span className="hidden lg:inline">
            Dashboard
          </span>
        </button>

        {/* Lock Vault */}

        <button
          type="button"
          onClick={handleLockVault}
          className="flex shrink-0 items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 font-semibold text-red-400 transition hover:bg-red-500/20 hover:text-red-300"
        >
          <LockKeyhole size={19} />

          <span className="hidden sm:inline">
            Lock Vault
          </span>
        </button>

      </div>
    </header>
  );
}

export default GalleryNavbar;