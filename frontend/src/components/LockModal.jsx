import { useState } from "react";

function LockModal({
  isOpen,
  onClose,
  onUnlock,
}) {
  const [pin, setPin] = useState("");

  if (!isOpen) return null;

  const handleUnlock = () => {
    if (pin === "2817") {
      onUnlock();
      setPin("");
    } else {
      alert("Incorrect PIN");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-96 rounded-3xl border border-white/10 bg-slate-900 p-8">

        <h2 className="text-2xl font-bold text-white">
          🔒 Secure Photo
        </h2>

        <p className="mt-3 text-slate-400">
          Enter your vault PIN to unlock.
        </p>

        <input
          type="password"
          maxLength={4}
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Enter PIN"
          className="mt-6 w-full rounded-xl border border-white/10 bg-slate-800 p-3 text-white outline-none"
        />

        <div className="mt-8 flex justify-end gap-4">

          <button
            onClick={() => {
              setPin("");
              onClose();
            }}
            className="rounded-xl border border-white/10 px-5 py-2 text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleUnlock}
            className="rounded-xl bg-violet-600 px-5 py-2 text-white hover:bg-violet-500"
          >
            Unlock
          </button>

        </div>

      </div>

    </div>
  );
}

export default LockModal;   