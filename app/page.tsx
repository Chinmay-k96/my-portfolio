//"use client";

import { navItems } from "@/data";

import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
import Certificates from "@/components/Certificates";
import Experience from "@/components/Experience";
import Rewards from "@/components/Rewards";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import Skills from "@/components/Skills";

const Home = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid />
        <Skills />
        <Experience />
        <Rewards />
        <Certificates />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
