import {
  ShieldCheck,
  Cloud,
  Smartphone,
  Zap,
} from "lucide-react";

import FeatureCard from "./FeatureCard";
import SectionHeading from "./SectionHeading";

const features = [
  {
    icon: ShieldCheck,
    title: "Military Grade Encryption",
    description:
      "Your private photos are protected using end-to-end encryption and secure authentication.",
  },
  {
    icon: Cloud,
    title: "Encrypted Cloud Backup",
    description:
      "Safely sync your memories across devices without compromising your privacy.",
  },
  {
    icon: Smartphone,
    title: "Access Anywhere",
    description:
      "Unlock your secure vault from any trusted device with a fast and seamless experience.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built with modern technologies to deliver instant loading and smooth navigation.",
  },
];

function Features() {
  return (
    <section className="relative overflow-hidden py-20 px-6">

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-900/5 to-transparent" />

      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-violet-600/10 blur-3xl"></div>

      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl">

        <SectionHeading
          badge="Features"
          title="Everything You Need To Protect Your Memories"
          description="Powerful privacy features designed for modern users."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;