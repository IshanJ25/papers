import React from "react";
import SearchBar from "@/components/Searchbar/searchbar";
import PinnedPapersCarousel from "@/components/PinnedPapersCarousel";

const Pinned = () => {
  return (
    <div id="pinned" className="flex flex-col justify-between">
      <h1 className="mx-auto my-8 text-center font-vipnabd text-3xl font-extrabold">
        Pinned Papers
      </h1>

      <div className="flex items-center justify-center gap-4 px-6">
        <div className="flex max-w-xl flex-1">
          <SearchBar type="pinned" />
        </div>
      </div>
      <PinnedPapersCarousel carouselType="users" />
      <div className="mt-6 flex w-full items-center justify-center">
        <p>You can pin upto 8 Subjects</p>
      </div>
    </div>
  );
};

export default Pinned;
