import { ArrowDown } from "lucide-react";

function HowItWorksCard({
  number,
  icon: Icon,
  title,
  description,
  last,
}) {
  return (
    <div className="relative flex flex-col items-center text-center">

      {/* Step Circle */}
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-lg shadow-violet-600/30 transition duration-500 hover:scale-110">

        <Icon size={34} className="text-white" />

        <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-violet-700">
          {number}
        </span>

      </div>

      <h3 className="mt-8 text-2xl font-bold text-white">
        {title}
      </h3>

      <p className="mt-4 max-w-xs leading-8 text-slate-400">
        {description}
      </p>

      {!last && (
        <div className="mt-8 hidden lg:flex">
          <ArrowDown
            size={34}
            className="rotate-[-90deg] text-violet-400"
          />
        </div>
      )}
    </div>
  );
}

export default HowItWorksCard;