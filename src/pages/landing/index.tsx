import CallToAction from "./components/call-to-action";
import FAQ from "./components/faq";
import HeaderLandingPage from "./components/header-landing";
import Hero from "./components/hero";
import LogoTicker from "./components/logo-ticker";
import Pricing from "./components/pricing";
import Testimonials from "./components/testimonials";

const LandingPage = () => {
  return (
    <div>
      <HeaderLandingPage />
      <Hero />
      <LogoTicker />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CallToAction />
    </div>
  );
};

export default LandingPage;
