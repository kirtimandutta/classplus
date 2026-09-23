import { AppCustomizer } from "@/components/app-customizer";
import { EarningsCalculator } from "@/components/earnings";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Pricing } from "@/components/pricing";
import { QuickLaunch } from "@/components/quick-launch";
import { Superpowers } from "@/components/superpowers";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <QuickLaunch />
        <AppCustomizer />
        <Superpowers />
        <EarningsCalculator />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
