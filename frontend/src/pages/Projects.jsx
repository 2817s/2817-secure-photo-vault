import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GitBranch,
  Search,
  Star,
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  Loader2,
} from "lucide-react";

function Projects() {
  const navigate = useNavigate();

  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchRepos = async () => {
    try {
      setLoading(true);
      setError(null);

      // Working GitHub REST API
      const response = await fetch(
         "https://api.github.com/users/2817s/repos"
        
      );

      if (!response.ok) {
        throw new Error(
          `GitHub API request failed (${response.status})`
        );
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error(
          "Invalid response received from GitHub API."
        );
      }

      setRepos(data);
    } catch (err) {
      console.error("GitHub API error:", err);
      setError(
        err.message || "Unable to load repositories."
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch repositories when the page loads
  useEffect(() => {
    fetchRepos();
  }, []);

  // Search/filter repositories
  const filteredRepos = repos.filter((repo) =>
    repo.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">

      <div className="pointer-events-none fixed inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(#ffffff22_1px,transparent_1px),linear-gradient(to_right,#ffffff22_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-5">

          <div>

            <div className="mb-3 flex items-center gap-3">

              <GitBranch
                size={28}
                className="text-violet-400"
              />

              <span className="text-sm font-semibold uppercase tracking-wider text-violet-400">
                Practical 3
              </span>

            </div>

            <h1 className="text-4xl font-extrabold sm:text-5xl">
              GitHub Projects
            </h1>

            <p className="mt-3 text-slate-400">
              Projects fetched dynamically from the GitHub REST API.
            </p>

          </div>

          <button
            type="button"
            onClick={() => navigate("/gallery")}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 px-5 py-3 font-semibold text-white transition hover:border-violet-500 hover:bg-violet-600"
          >
            <ArrowLeft size={18} />
            Back to Gallery
          </button>

        </div>

        {/* Search */}
        <div className="mb-8 max-w-xl">

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 px-5 py-4 backdrop-blur-xl">

            <Search
              size={21}
              className="shrink-0 text-slate-500"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search repositories..."
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
            />

          </div>

        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-white/10 bg-slate-900/60 p-10">

            <Loader2
              size={42}
              className="animate-spin text-violet-400"
            />

            <p className="mt-5 text-lg font-semibold">
              Loading repositories...
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Fetching projects from GitHub.
            </p>

          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-3xl border border-red-500/20 bg-red-950/20 p-10 text-center">

            <AlertCircle
              size={48}
              className="mx-auto text-red-400"
            />

            <h2 className="mt-5 text-2xl font-bold text-white">
              Unable to load repositories
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm text-red-300">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchRepos}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-500"
            >
              <RefreshCw size={18} />
              Try Again
            </button>

          </div>
        )}

        {/* Successful API Response */}
        {!loading && !error && (
          <>

            <div className="mb-6 flex items-center justify-between">

              <p className="text-sm text-slate-400">
                Showing{" "}
                <span className="font-semibold text-white">
                  {filteredRepos.length}
                </span>{" "}
                {filteredRepos.length === 1
                  ? "repository"
                  : "repositories"}
              </p>

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-sm font-semibold text-violet-400 hover:text-violet-300"
                >
                  Clear Search
                </button>
              )}

            </div>

            {filteredRepos.length === 0 ? (

              <div className="rounded-3xl border border-dashed border-white/10 bg-slate-900/60 p-16 text-center">

                <Search
                  size={42}
                  className="mx-auto text-slate-600"
                />

                <h2 className="mt-5 text-xl font-bold">
                  No repositories found
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Try searching for a different repository name.
                </p>

              </div>

            ) : (

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {filteredRepos.map((repo) => (

                  <div
                    key={repo.id}
                    className="group rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-500/40"
                  >

                    {/* Card Top */}
                    <div className="mb-6 flex items-start justify-between gap-4">

                      <div className="rounded-2xl bg-violet-600/15 p-4 text-violet-400">
                        <GitBranch size={28} />
                      </div>

                      <div className="flex items-center gap-1 rounded-lg bg-slate-950 px-3 py-2 text-sm">

                        <Star
                          size={16}
                          className="text-yellow-400"
                        />

                        <span className="text-white">
                          {repo.stargazers_count}
                        </span>

                      </div>

                    </div>

                    {/* Repository Name */}
                    <h2 className="truncate text-xl font-bold text-white">
                      {repo.name}
                    </h2>

                    {/* Description */}
                    <p className="mt-3 min-h-12 text-sm leading-6 text-slate-400">
                      {repo.description ||
                        "No repository description available."}
                    </p>

                    {/* Repository URL */}
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 block break-all text-sm font-semibold text-violet-400 transition hover:text-violet-300"
                    >
                      {repo.html_url}
                    </a>

                  </div>

                ))}

              </div>

            )}

          </>
        )}

      </div>
    </main>
  );
}

export default Projects;