import { Footer } from "@/components/footer";
import { FooterMenuContent } from "@/components/footer-menu-content";
import { Navigation } from "@/components/navigation";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="min-h-screen">
        <Navigation />
        <FooterMenuContent />
        <Footer />
      </div>
    </div>
  );
};

export default page;
