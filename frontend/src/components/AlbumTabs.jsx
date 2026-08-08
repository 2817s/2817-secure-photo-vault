import {
  Images,
  Users,
  Plane,
  Lock,
  Heart,
} from "lucide-react";

const albums = [
  {
    name: "All",
    icon: Images,
  },
  {
    name: "Family",
    icon: Users,
  },
  {
    name: "Vacation",
    icon: Plane,
  },
  {
    name: "Private",
    icon: Lock,
  },
  {
    name: "Favorites",
    icon: Heart,
  },
];

function AlbumTabs({
  selectedAlbum,
  setSelectedAlbum,
}) {
  return (
    <section className="mx-auto mt-10 max-w-7xl px-6">

      <h2 className="mb-6 text-3xl font-bold text-white">
        Albums
      </h2>

      <div className="flex flex-wrap gap-4">

        {albums.map((album) => {
          const Icon = album.icon;

          return (
            <button
              key={album.name}
              onClick={() => setSelectedAlbum(album.name)}
              className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300
                ${
                  selectedAlbum === album.name
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                    : "border border-white/10 bg-slate-900/70 text-slate-300 hover:border-violet-500 hover:text-white"
                }`}
            >
              <Icon size={18} />
              {album.name}
            </button>
          );
        })}

      </div>

    </section>
  );
}

export default AlbumTabs;