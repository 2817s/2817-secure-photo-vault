import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden pt-36">
      {/* Background Glow */}
      <div className="absolute -top-40 left-10 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl"></div>
      <div className="absolute right-10 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"></div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
          <ShieldCheck size={18} />
          Privacy First
        </div>

        <h1 className="max-w-4xl text-5xl font-extrabold leading-tight md:text-7xl">
          Every Memory
          <br />
          Deserves Protection.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-400">
          Store your personal photos inside a secure digital vault built for
          privacy, simplicity, and peace of mind.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/unlock"
            className="flex items-center gap-2 rounded-2xl bg-violet-600 px-7 py-4 font-semibold text-white transition hover:scale-105 hover:bg-violet-500"
          >
            Unlock Your Vault
            <ArrowRight size={20} />
          </Link>

          <button className="rounded-2xl border border-white/10 px-7 py-4 text-slate-300 transition hover:border-cyan-400 hover:text-white">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;