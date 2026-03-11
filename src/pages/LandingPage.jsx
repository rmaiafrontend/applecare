import HeroSection from './landing/sections/HeroSection';
import FeaturesMosaic from './landing/sections/FeaturesMosaic';
import SmartRegistration from './landing/sections/SmartRegistration';
import DesignCarousel from './landing/sections/DesignCarousel';
import AssistedPurchase from './landing/sections/AssistedPurchase';
import LinktreeSection from './landing/sections/LinktreeSection';
import PricingSection from './landing/sections/PricingSection';
import CtaSection from './landing/sections/CtaSection';
import FooterSection from './landing/sections/FooterSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black selection:bg-white selection:text-black overflow-x-hidden">
      <HeroSection />
      <FeaturesMosaic />
      <SmartRegistration />
      <DesignCarousel />
      <AssistedPurchase />
      <LinktreeSection />
      <PricingSection />
      <CtaSection />
      <FooterSection />
    </div>
  );
}
