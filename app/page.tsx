import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { CategoriesSection } from "@/components/categories-section";
import { DeliverySection } from "@/components/delivery-section";
import { AboutSection } from "@/components/about-section";
import { ReadyToServeSection } from "@/components/ready-to-serve-section";
import VideoSection from "@/components/VideoSection";
import ComingSooon from "@/components/coming-soon";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* <Navigation /> */}
      <main>
        <HeroSection />
        <CategoriesSection />
        <DeliverySection />
        <VideoSection
          src="/burge-vedio.mp4"
          poster="/images/video-poster.jpg"
        />
        <AboutSection />
        {/* <ReadyToServeSection /> */}
        <ComingSooon/>
      </main>
      <Footer />
    </div>
  );
}
