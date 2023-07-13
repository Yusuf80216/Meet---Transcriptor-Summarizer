import React, { useState } from "react";
import BodySection from "../components/BodySection";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
const Home = () => {
  
  return (
    <>
      <div className="home px-3 lg:px-2 lg:py-2 xl:max-w-[1300px] w-full mx-auto">
        {/* navigation bar */}
        <Navbar/>
        {/* body */}
        <BodySection/>
      </div>

    </>
  );
};

export default Home;
