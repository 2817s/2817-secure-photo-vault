import { ShieldCheck } from "lucide-react";
import PinInput from "./PinInput";

function UnlockCard({
  pin,
  setPin,
  handleUnlock,
  error,
  loading,
  success,
}) {
  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/70 p-10 backdrop-blur-xl">

      <div className="mb-8 flex justify-center">
        <div className="rounded-full bg-violet-600/20 p-5 text-violet-400">
          <ShieldCheck size={42} />
        </div>
      </div>

      <h1 className="text-center text-4xl font-bold text-white">
        Welcome Back
      </h1>

      <p className="mt-3 text-center text-slate-400">
        Enter your secure 4-digit PIN
      </p>

      <div className="mt-8">
        <PinInput
          value={pin}
          onChange={setPin}
        />
      </div>

      <button
        onClick={handleUnlock}
        disabled={loading || success}
        className="mt-8 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-purple-500 py-5 text-lg font-semibold text-white transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading
          ? "Unlocking..."
          : success
          ? "✔ Access Granted"
          : "Unlock Vault"}
      </button>

      {error && (
        <p className="mt-4 text-center text-red-400">
          Incorrect PIN
        </p>
      )}
    </div>
  );
}

export default UnlockCard;