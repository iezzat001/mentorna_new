
import Hero from "@/components/Hero";
import SuccessStories from "@/components/SuccessStories";
import ProgramSection from "@/components/ProgramSection";
import FoundersSection from "@/components/FoundersSection";
import SecondarySection from "@/components/SecondarySection";

const Index = () => {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <SuccessStories />
      <ProgramSection />
      <FoundersSection />
      <SecondarySection />
    </div>
  );
};

export default Index;
