import type { Metadata } from "next";
import ContactCTA from "@/components/homepage/ContactCTA";
import Footer from "@/components/layout/Footer";
import SocialBar from "@/components/layout/SocialBar";
import { WebDevCTA, WebDevHero, WebDevProcess, WebDevServices, WebDevTechStack } from "@/components/webdev";

export const metadata: Metadata = {
  title: "Web Development | Adapts Media",
  description:
    "Precision-crafted web experiences built for performance and prestige. Next.js, React, headless CMS, eCommerce, and custom API development.",
};

const WebDevelopmentPage = () => {
  return (
    <div>
      <WebDevHero />
      <WebDevServices />
      <WebDevProcess />
      <WebDevTechStack />
      <WebDevCTA />
      <ContactCTA />
      <SocialBar />
      <Footer />
    </div>
  );
};

export default WebDevelopmentPage;
