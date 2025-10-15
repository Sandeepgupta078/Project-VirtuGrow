import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";

export default function Home() {
  return (
    <div>
      {/* <Navbar /> */}
      <HeroSection />
      <FeaturesSection />
      <footer className="bg-gray-900 text-white text-center py-6 mt-10">
        © {new Date().getFullYear()} TaskMaster. All rights reserved.<br />
        Made with <span style={{ color: "red" }}>♥</span> by Sandeep
      </footer>
    </div>
  );
}
