import About from "./About";
import Clients from "./Clients";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Footer from "./Footer";
import Hero from "./Hero";
import Innovation from "./Innovation";
import Marquee from "./Marquee";
import Nav from "./Nav";
import NeuralLink from "./NeuralLink";
import Process from "./Process";
import Products from "./Products";
import Services from "./Services";
import Work from "./Work";

export default function HomePage() {
  return (
    <>
      <Cursor />
      <div className="page">
        <Nav />
        <main id="top">
          <Hero />
          <Marquee />
          <Services />
          <Innovation />
          <Marquee source="innovation" reverse />
          <NeuralLink />
          <Products />
          <Process />
          <About />
          <Work />
          <Clients />
          <Marquee source="clients" reverse />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
