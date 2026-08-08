import {
  Lock,
  Image,
  Heart,
  Cloud,
  Shield
} from "lucide-react";

function PhonePreview() {

  return (

    <div className="relative animate-[float_6s_ease-in-out_infinite]">

      <div className="absolute inset-0 rounded-[3rem] bg-violet-500/20 blur-3xl"></div>

      <div className="relative w-80 rounded-[2.8rem] border border-white/10 bg-slate-900 p-5 shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-xl font-bold text-white">
            2817 Vault
          </h2>

          <Lock className="text-violet-400"/>

        </div>

        <div className="mb-5 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-500 p-4">

          <p className="text-sm text-white/80">
            Protected Photos
          </p>

          <h2 className="mt-1 text-4xl font-bold text-white">
            1,248
          </h2>

        </div>

        <div className="space-y-3">

          {[
            "Family",
            "Vacation",
            "Private",
            "Favorites"
          ].map((item) => (

            <div
              key={item}
              className="flex items-center justify-between rounded-xl bg-slate-800 p-4 transition duration-300 hover:bg-slate-700"
            >

              <div className="flex items-center gap-3">

                <Image
                  className="text-cyan-400"
                  size={20}
                />

                <span>{item}</span>

              </div>

              <Heart
                className="text-pink-400"
                size={18}
              />

            </div>

          ))}

        </div>

        <div className="mt-6 flex justify-between rounded-xl border border-white/10 p-4 text-slate-300">

          <Cloud/>

          <Shield/>

          <Lock/>

        </div>

      </div>

    </div>

  );

}

export default PhonePreview;