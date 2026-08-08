import {
  Images,
  ShieldCheck,
  Cloud,
  Users,
} from "lucide-react";

import SectionHeading from "./SectionHeading";

const stats = [
  {
    icon: Images,
    number: "1,248+",
    title: "Protected Photos",
  },
  {
    icon: ShieldCheck,
    number: "99.99%",
    title: "Security Rate",
  },
  {
    icon: Cloud,
    number: "24/7",
    title: "Cloud Backup",
  },
  {
    icon: Users,
    number: "500+",
    title: "Happy Users",
  },
];

function Statistics() {
  return (
    <section className="relative py-20 px-6">

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent" />

      <SectionHeading
        badge="Statistics"
        title="Trusted Security In Numbers"
        description="Our vault is built to protect every memory with speed, privacy and reliability."
      />

      <div className="relative mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-4">

        {stats.map((item, index) => {

          const Icon = item.icon;

          return (

            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-violet-500 hover:shadow-2xl hover:shadow-violet-500/20"
            >

              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-400">

                <Icon size={30} />

              </div>

              <h2 className="text-5xl font-bold text-white">

                {item.number}

              </h2>

              <p className="mt-4 text-slate-400">

                {item.title}

              </p>

            </div>

          );

        })}

      </div>

    </section>
  );
}

export default Statistics;