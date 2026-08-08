function DashboardCard({ icon, title, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 text-center backdrop-blur-xl transition hover:-translate-y-2 hover:border-violet-500">

      <div className="mb-5 flex justify-center text-4xl">
        {icon}
      </div>

      <h3 className="text-lg text-slate-400">
        {title}
      </h3>

      <h1 className="mt-3 text-5xl font-bold text-white">
        {value}
      </h1>

    </div>
  );
}

export default DashboardCard;