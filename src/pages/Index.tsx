
import Hero from "@/components/Hero";
import SuccessStories from "@/components/SuccessStories";
import ProgramSection from "@/components/ProgramSection";
import PricingSection from "@/components/PricingSection";
import FoundersSection from "@/components/FoundersSection";
import SecondarySection from "@/components/SecondarySection";

const Index = () => {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <SuccessStories />
      <ProgramSection />
      <PricingSection />
      <FoundersSection />
      <SecondarySection />
    </div>
  );
};

export default Index;
