import { Link, NavLink } from "react-router-dom";
import { LockKeyhole } from "lucide-react";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white"
        >
          <div className="rounded-xl bg-violet-600 p-2">
            <LockKeyhole size={22} />
          </div>

          <span className="text-xl font-bold tracking-wide">
            2817 Vault
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-cyan-400"
                : "text-slate-300 hover:text-white transition"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              isActive
                ? "text-cyan-400"
                : "text-slate-300 hover:text-white transition"
            }
          >
            Gallery
          </NavLink>

          <NavLink
            to="/unlock"
            className={({ isActive }) =>
              isActive
                ? "text-cyan-400"
                : "text-slate-300 hover:text-white transition"
            }
          >
            Unlock
          </NavLink>
        </div>

        {/* CTA */}
        <Link
          to="/unlock"
          className="rounded-xl bg-violet-600 px-5 py-2 font-semibold text-white transition hover:bg-violet-500"
        >
          Unlock Vault
        </Link>

      </nav>
    </header>
  );
}

export default Navbar;