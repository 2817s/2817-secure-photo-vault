import { LockKeyhole, Heart, ImageIcon } from "lucide-react";

function PhonePreview() {
  return (
    <div className="relative mt-16">
      <div className="mx-auto w-72 rounded-[2.5rem] border-4 border-slate-700 bg-slate-900 p-4 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold text-white">2817 Vault</h3>
          <LockKeyhole className="text-violet-400" size={20} />
        </div>

        <div className="space-y-3">
          {["Family", "Vacation", "Private", "Favorites"].map((album) => (
            <div
              key={album}
              className="flex items-center justify-between rounded-xl bg-slate-800 p-3"
            >
              <div className="flex items-center gap-3">
                <ImageIcon size={20} className="text-cyan-400" />
                <span>{album}</span>
              </div>

              <Heart size={18} className="text-pink-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PhonePreview;