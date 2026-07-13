function Hero({ title, description }) {
  return (
    <section className="hero">
      <h1>{title}</h1>
      <p>{description}</p>
      <button>Open Your Vault</button>
    </section>
  );
}

export default Hero;