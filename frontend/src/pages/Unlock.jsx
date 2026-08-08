import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UnlockCard from "../components/UnlockCard";

function Unlock() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleUnlock = () => {
    if (loading) return;

    setLoading(true);
    setError(false);

    setTimeout(() => {
      // Correct PIN
      if (pin === "2817") {
        // 🔓 Save unlocked state
        sessionStorage.setItem(
          "vaultUnlocked",
          "true"
        );

        setSuccess(true);

        // Go to gallery
        setTimeout(() => {
          navigate("/gallery", {
            replace: true,
          });
        }, 800);
      } else {
        // ❌ Wrong PIN
        setLoading(false);
        setError(true);
      }
    }, 1000);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-6">

      {/* Background Grid */}

      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(#ffffff22_1px,transparent_1px),linear-gradient(to_right,#ffffff22_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Violet Glow */}

      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

      {/* Cyan Glow */}

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

      {/* Main Content */}

      <div className="relative z-10 w-full max-w-md">

        {/* Heading */}

        <div className="mb-10 text-center">

          <h1 className="text-5xl font-extrabold text-white">
            2817 Vault
          </h1>

          <p className="mt-4 text-slate-400">
            Secure access to your private memories.
          </p>

        </div>

        {/* Unlock Card */}

        <UnlockCard
          pin={pin}
          setPin={setPin}
          handleUnlock={handleUnlock}
          error={error}
          loading={loading}
          success={success}
        />

      </div>
    </main>
  );
}

export default Unlock;