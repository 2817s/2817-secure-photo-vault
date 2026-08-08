import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function PinInput({ value, onChange }) {
  const [showPin, setShowPin] = useState(false);

  return (
    <div className="relative w-full">

      <input
  type={showPin ? "text" : "password"}
  value={value}
  maxLength={4}
  onChange={(e) => {
    const input = e.target.value.replace(/\D/g, "");
    onChange(input);
  }}
  placeholder="••••"
  className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-6 py-5 text-center text-3xl tracking-[18px] text-white outline-none transition focus:border-violet-500"
/>

      <button
        type="button"
        onClick={() => setShowPin(!showPin)}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
      >
        {showPin ? <EyeOff size={22} /> : <Eye size={22} />}
      </button>

    </div>
  );
}

export default PinInput;