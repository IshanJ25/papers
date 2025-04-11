import React from "react";
import SearchBar from "../Searchbar/searchbar";
import StoredPapers from "../StoredPapers";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="tall:h-[85vh] flex flex-between flex-col">
      <h1 className="vipnabd mx-auto my-8 text-center text-3xl font-extrabold">
        Built by Students for Students
      </h1>
      <SearchBar />
      <StoredPapers />
      <div className="mt-2 flex flex-col items-center whitespace-nowrap text-center">
        <h1 className="play text-md">Learn More</h1>
        <Link
          href="#hero"
          className="play text-md flex items-center justify-center text-center text-black dark:text-white"
        >
          ▼
        </Link>
      </div>
    </div>
  );
};

export default Hero;
