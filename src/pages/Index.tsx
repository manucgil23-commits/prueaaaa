import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedEvents from "@/components/FeaturedEvents";
import HowItWorks from "@/components/HowItWorks";
import TrustFeatures from "@/components/TrustFeatures";
import ForPromoters from "@/components/ForPromoters";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Categories />
        <FeaturedEvents />
        <HowItWorks />
        <TrustFeatures />
        <ForPromoters />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
