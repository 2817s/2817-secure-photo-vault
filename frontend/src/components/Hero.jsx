import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import PhonePreview from "./PhonePreview";

function Hero() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-24">

        {/* Background Grid */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(#ffffff22_1px,transparent_1px),linear-gradient(to_right,#ffffff22_1px,transparent_1px)] bg-[size:60px_60px]"></div>

        {/* Left Glow */}
        <div className="absolute -top-40 left-10 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl"></div>

        {/* Right Glow */}
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl"></div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

          {/* Left Content */}
          <div>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 shadow-lg shadow-cyan-500/20">
              <ShieldCheck size={18} />
              Military Grade Security
            </div>

            <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">
              Your Memories.
              <br />
              Your Privacy.
              <br />
              Your Control.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-400">
              Protect your most personal moments with encrypted cloud storage,
              secure albums, and instant access whenever you need them.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <Link
                to="/unlock"
                className="flex items-center gap-2 rounded-2xl bg-violet-600 px-9 py-5 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-violet-500"
              >
                Unlock Vault
                <ArrowRight size={20} />
              </Link>

              <button className="rounded-2xl border border-white/10 px-9 py-5 text-slate-300 transition-all duration-300 hover:border-cyan-400 hover:text-white">
                Learn More
              </button>

            </div>

          </div>

          {/* Right Content */}
          <div className="flex justify-center">
            <PhonePreview />
          </div>

        </div>

      </section>

      {/* Smooth Transition */}
      <div className="h-12 bg-gradient-to-b from-transparent to-[#050816]" />
    </>
  );
}

export default Hero;