import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SecurityCard from "./components/SecurityCard";
import Footer from "./components/Footer";

function App() {
  const appName = "2817 Vault";

  return (
    <>
      <Navbar appName={appName} />

      <Hero
        title="Your Photos. Your Privacy."
        description="A secure space built to keep your personal memories private."
      />

      <section className="security">
        <h2>Built for Privacy</h2>

        <div className="security-grid">
          <SecurityCard
            title="Private Storage"
            description="Keep your personal photos protected."
          />

          <SecurityCard
            title="Secure Access"
            description="Only authorized users can access the vault."
          />

          <SecurityCard
            title="Your Control"
            description="Your photos stay under your control."
          />
        </div>
      </section>

      <Footer appName={appName} />
    </>
  );
}

export default App;