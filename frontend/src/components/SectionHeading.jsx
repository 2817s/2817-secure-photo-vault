function SectionHeading({ badge, title, description }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">

      <span className="rounded-full bg-violet-600/20 px-4 py-2 text-sm text-violet-300">

        {badge}

      </span>

      <h2 className="mt-5 text-4xl font-bold text-white md:text-5xl">

        {title}

      </h2>

      <p className="mt-5 text-lg text-slate-400">

        {description}

      </p>

    </div>
  );
}

export default SectionHeading;