"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ccLogo from "../assets/codechef_logo.svg";
import ModeToggle from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import { ArrowDownLeftIcon, Pin, ArrowUpRight } from "lucide-react";
import NavDropdownButton from "./NavDropdownButton";
import FloatingNavbar from "./FloatingNavbar";
import PWAInstallButton from "./ui/PWAInstallButton";

function Navbar() {
  const pathname = usePathname();
  const [subjects, setSubjects] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Type guard to safely narrow unknown JSON
  function isCourseArray(data: unknown): data is { name: string }[] {
    return Array.isArray(data) &&
      data.every(
        (item) =>
          typeof item === "object" &&
          item !== null &&
          "name" in item &&
          typeof (item as { name?: unknown }).name === "string"
      );
  }

  useEffect(() => {
    async function getSubjects() {
      const res = await fetch("/api/course-list");
      const json = (await res.json()) as unknown;

      if (isCourseArray(json)) {
        setSubjects(json.map((course) => course.name));
      } else {
        setSubjects([]);
      }
    }
    if (pathname === "/catalogue") {
      void getSubjects(); // explicitly mark as intentionally un-awaited
    }
  }, [pathname]);

  const renderHomePageButtons = () => (
    <>
      <Link href="/pinned">
        <div className="ml-2 flex items-center gap-2 rounded-full border bg-[#e8e9ff] dark:bg-black border-[#3A3745] px-4 py-2 text-sm font-semibold dark:text-white transition hover:bg-slate-50 text-gray-700 dark:hover:bg-[#1A1823] h-10">
          <Pin className="h-4 w-4" />
          Pinned Subjects
        </div>
      </Link>
      <Link href="/request">
        <div className="ml-2 flex items-center gap-2 rounded-full border bg-[#e8e9ff] dark:bg-black border-[#3A3745] px-4 py-2 text-sm font-semibold dark:text-white transition hover:bg-slate-50 text-gray-700 dark:hover:bg-[#1A1823] h-10">
          <ArrowUpRight className="h-4 w-4" />
          Paper Request
        </div>
      </Link>
    </>
  );

  return (
    <div className="sticky top-0 z-10 w-full bg-[#B2B8FF] px-4 py-4 dark:bg-[#130E1F] md:px-8 md:py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <Link href="https://www.codechefvit.com/" target="_blank">
            <Image
              src={ccLogo as HTMLImageElement}
              alt="codechef-logo"
              height={60}
              width={60}
            />
          </Link>

          <Link
            href="/"
            className="bg-gradient-to-r from-[#562EE7] to-[rgba(116,128,255,0.8)] bg-clip-text font-jost text-4xl font-bold tracking-wide text-transparent dark:from-[#562EE7] dark:to-[#FFC6E8] md:text-6xl"
          >
            Papers
          </Link>

          <div className="mt-3 hidden md:flex">
            <Link href="/pinned">
              <div className="ml-2 flex items-center gap-2 rounded-full border bg-[#e8e9ff] dark:bg-black border-[#3A3745] px-4 py-2 text-sm font-semibold dark:text-white transition hover:bg-slate-50 text-gray-700 dark:hover:bg-[#1A1823]">
                <Pin className="h-4 w-4" />
                Pinned Subjects
              </div>
            </Link>
            <div className="ml-2 hidden md:flex">
              <Link href="/request">
                <div className="ml-2 flex items-center gap-2 rounded-full border bg-[#e8e9ff] dark:bg-black border-[#3A3745] px-4 py-2 text-sm font-semibold dark:text-white transition hover:bg-slate-50 text-gray-700 dark:hover:bg-[#1A1823]">
                  <ArrowUpRight className="h-4 w-4" />
                  Paper Request
                </div>
              </Link>
            </div>
          </div>

          {/* Desktop: Create Paper Request button */}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <div className="rounded-full border border-[#3A3745] p-1">
            <ModeToggle />
          </div>

          <div className="hidden max-w-[200px] md:block">
            <PWAInstallButton />
          </div>

          <Link href={pathname === "/upload" ? "/" : "/upload"}>
            <div className="flex items-center gap-2 rounded-full border bg-[#e8e9ff] dark:bg-black border-[#3A3745] px-4 py-2 text-sm font-semibold dark:text-white transition hover:bg-slate-50 text-gray-700 dark:hover:bg-[#1A1823]">
              <ArrowDownLeftIcon className="h-4 w-4 rotate-90" />
              <span>
                {pathname === "/upload" ? "Search Papers" : "Upload Papers"}
              </span>
            </div>
          </Link>
        </div>

        <div className="md:hidden">
          {}
          <FloatingNavbar onNavigate={() => undefined} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;