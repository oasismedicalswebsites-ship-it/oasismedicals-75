
import Navbar from "@/components/Navbar";
import HeroSlideshow from "@/components/HeroSlideshow";
import Services from "@/components/Services";
import CallToNotice from "@/components/CallToNotice";
import PricingDetails from "@/components/PricingDetails";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSlideshow />
        <About />
        <Services />
        <CallToNotice />
        <PricingDetails />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
      <LanguageSwitcher />
    </div>
  );
};

export default Index;
