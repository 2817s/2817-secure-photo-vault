import { ArrowUpRight } from "lucide-react";

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-violet-500 hover:shadow-[0_20px_60px_rgba(124,58,237,0.35)]">

      {/* Glow */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-600/20 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100"></div>

      {/* Icon */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white">
        <Icon size={30} />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-4 leading-8 text-slate-400">
        {description}
      </p>

      {/* Arrow */}
      <div className="mt-8 flex items-center text-violet-400 opacity-0 transition duration-300 group-hover:opacity-100">
        Learn More
        <ArrowUpRight className="ml-2" size={18} />
      </div>

    </div>
  );
}

export default FeatureCard;