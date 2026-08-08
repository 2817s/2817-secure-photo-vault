import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Features from "../components/Features";
import Statistics from "../components/Statistics";

function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <Hero />
        <Features />
      <Statistics />
      <Footer />
    </div>
  );
}

export default Landing;