"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ccLogo from "../assets/codechef_logo.svg";
import ModeToggle from "@/components/toggle-theme";
import { ArrowDownLeftIcon, Pin, ArrowUpRight } from "lucide-react";
import NavDropdownButton from "./NavDropdownButton";
import FloatingNavbar from "./FloatingNavbar";
import PWAInstallButton from "./ui/PWAInstallButton";
import SearchBarChild from "./Searchbar/searchbar-child";

function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [subjects, setSubjects] = useState<string[]>([]);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function getSubjects() {
      const res = await fetch("/api/course-list");
      const data = await res.json();
      setSubjects(data.map((course: { name: string }) => course.name));
    }
    if (pathname === "/catalogue") getSubjects();
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);


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
        <div className="flex items-center gap-4 relative">
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

          {pathname === "/catalogue" ? (
            <div
              ref={dropdownContainerRef}
              className="ml-4 hidden md:block relative"
            >
              <NavDropdownButton
                isOpen={open}
                onClick={() => setOpen((prev) => !prev)}
                variant="default"
              />
              {open && (
                <div className="absolute left-0 mt-3 w-56 rounded-2xl bg-[#4B22D1] shadow-2xl border border-[rgba(255,255,255,0.1)] z-50 overflow-hidden backdrop-blur-sm">
                  <div className="py-2">
                    <Link href="/pinned">
                      <button
                        onClick={() => setOpen(false)}
                        className="w-full px-4 py-3 text-left text-white hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200 flex items-center gap-3 group"
                      >
                        <Pin className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                        <span className="font-medium">Pinned Subjects</span>
                      </button>
                    </Link>
                    <Link href="/request">
                      <button
                        onClick={() => setOpen(false)}
                        className="w-full px-4 py-3 text-left text-white hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200 flex items-center gap-3 group"
                      >
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                        <span className="font-medium">Paper Request</span>
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center h-10">
              {renderHomePageButtons()}
            </div>
          )}
        </div>

        {pathname === "/catalogue" && (
          <div className="hidden md:flex flex-1 justify-center mx-4">
            <div className="w-full max-w-[700px]">
              <SearchBarChild initialSubjects={subjects} />
            </div>
          </div>
        )}

        <div className="hidden items-center gap-4 md:flex">
          <div className="rounded-full border border-[#3A3745] p-1">
            <ModeToggle />
          </div>
          <div className="hidden max-w-[200px] md:block">
            <PWAInstallButton />
          </div>
          <Link href={pathname === "/upload" ? "/" : "/upload"}>
            <div className="flex items-center gap-2 rounded-full border bg-[#e8e9ff] dark:bg-black border-[#3A3745] px-4 py-2 text-sm font-semibold dark:text-white transition hover:bg-slate-50 text-gray-700 dark:hover:bg-[#1A1823] h-10">
              <ArrowDownLeftIcon className="h-4 w-4 rotate-90" />
              <span>
                {pathname === "/upload" ? "Search Papers" : "Upload Papers"}
              </span>
            </div>
          </Link>
        </div>

        <div className="md:hidden" ref={dropdownContainerRef}>
          <NavDropdownButton
            isOpen={open}
            onClick={() => setOpen((prev) => !prev)}
            variant="default"
          />
          <div
            className={`transition-all duration-300 ease-in-out ${open ? "block" : "hidden"
              }`}
          >
            <FloatingNavbar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
