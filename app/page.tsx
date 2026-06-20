import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Stack from "@/components/sections/Stack";
import Experience from "@/components/sections/Experience";
import Work from "@/components/sections/Work";
import AskMyPortfolio from "@/components/sections/AskMyPortfolio";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Reveal from "@/components/Reveal";
import CommandPalette from "@/components/CommandPalette";
import Guestbook from "@/components/Guestbook";
import Stats from "@/components/Stats";
import ScrollProgress from "@/components/ScrollProgress";
import CursorFX from "@/components/CursorFX";
import Marquee from "@/components/Marquee";
import GitHubStats from "@/components/GitHubStats";
import Effects from "@/components/Effects";
import ToTop from "@/components/ToTop";
import Konami from "@/components/Konami";
import Coins from "@/components/Coins";
import ChatWidget from "@/components/ChatWidget";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main className="wrap" id="main">
        <Hero />
        <Stats />
        <Marquee />
        <GitHubStats />
        <About />
        <Stack />
        <Experience />
        <Work />
        <AskMyPortfolio />
        <Contact />
        <Guestbook />
      </main>
      <Footer />
      <Reveal />
      <CommandPalette />
      <CursorFX />
      <Effects />
      <ToTop />
      <Konami />
      <Coins />
      <ChatWidget />
    </>
  );
}
