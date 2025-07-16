"use client";

import React, { useEffect, useState } from "react";
import { fetchSubjects } from "./Searchbar/searchbar";
import { Filter } from "lucide-react";
import { type Filters, type IPaper } from "@/interface";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function SideBar({
  filtersNotPulled,
  loading,
  selectedExams,
  selectedSlots,
  selectedYears,
  selectedCampuses,
  selectedSemesters,
  selectedAnswerKeyIncluded,
  filterOptions,
  handleApplyFilters,
}: {
  filtersNotPulled: () => void;
  loading: boolean;
  selectedExams: string[];
  selectedSlots: string[];
  selectedYears: string[];
  selectedCampuses: string[];
  selectedSemesters: string[];
  selectedAnswerKeyIncluded: boolean;
  noAppliedFilters: () => void;
  closeFilters: () => void;
  subject: string | null;
  filterOptions: Filters | undefined;
  handleApplyFilters: (
    exams: string[],
    slots: string[],
    years: string[],
    campus: string[],
    semester: string[],
    anskey: boolean,
  ) => void;
}) {
  const exams = filterOptions?.uniqueExams.map((exam) => ({
    label: exam,
    value: exam,
  }));
  const slots = filterOptions?.uniqueSlots.map((slot) => ({
    label: slot,
    value: slot,
  }));
  const years = filterOptions?.uniqueYears.map((year) => ({
    label: year,
    value: year,
  }));
  const semesters = filterOptions?.uniqueSemesters.map((semester) => ({
    label: semester,
    value: semester,
  }));
  const [subjects, setSubjects] = useState<string[]>([]);

  useEffect(() => {
    async function fetchSubjectsSidebar() {
      if (loading) return;
      const fetchedSubjects = await fetchSubjects();
      setSubjects(fetchedSubjects);
    }
    void fetchSubjectsSidebar();
  }, [loading]);

  return (
    <div className="no-scrollbar mb-0 h-[100vh] min-w-fit flex-col items-baseline overflow-y-scroll border-r-2 border-[#36266d] bg-[#f3f5ff] py-[20px] dark:bg-[#070114] md:flex">
      {/* FILTER HEADER */}
      <div className="flex w-full items-center justify-between border-b-2 border-[#36266d] px-[10px] py-3">
        <div className="flex items-center gap-1">
          <Filter size={24} />
          <div className="font-play text-xl font-bold">Filters</div>
        </div>
        <div className="flex flex-col">
          <div
            className="font-play cursor-pointer rounded-full border-2 border-black px-2 py-1 text-xs font-semibold hover:bg-slate-800 hover:text-white dark:border-[#434dba] dark:hover:border-white dark:hover:bg-slate-900"
            onClick={() => {
              handleApplyFilters([], [], [], [], [], false);
            }}
          >
            Reset Filters
          </div>
        </div>
      </div>

      {/* ANSWER KEY TOGGLE */}
      <div className="flex w-full items-center justify-between border-b-2 border-[#36266d] px-[10px] py-3">
        <div
          onClick={() => {
            handleApplyFilters(
              selectedExams,
              selectedSlots,
              selectedYears,
              selectedCampuses,
              selectedSemesters,
              !selectedAnswerKeyIncluded,
            );
          }}
          className={`font-play flex cursor-pointer rounded-full border-2 border-black px-2 py-1 text-xs font-semibold hover:bg-slate-800 hover:text-white ${selectedAnswerKeyIncluded ? "border-[#B2B8FF] bg-[#B2B8FF] hover:border-black hover:bg-[#B2B8FF] dark:border-[#434dba] dark:bg-[#434dba] dark:hover:border-[white] dark:hover:bg-[#434dba]" : "bg-none hover:bg-[#B2B8FF] dark:border-white dark:hover:border-[#434dba]"}`}
        >
          Answer Key Available
        </div>
      </div>

      {/* ACCORDIONS */}
      <div className="flex w-full flex-col items-baseline justify-between px-[10px]">
        <Accordion className="w-full" type="single" collapsible defaultValue="item-1">
          <AccordionItem className="border-none no-underline" value="item-1">
            <AccordionTrigger className="w-full no-underline">
              <div className="font-play text-sm no-underline">Exams</div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="my-2 flex w-full flex-wrap items-center">
                {exams?.map((exam) => (
                  <div
                    key={exam.value}
                    onClick={() =>
                      handleApplyFilters(
                        selectedExams.includes(exam.value)
                          ? selectedExams.filter((e) => e !== exam.value)
                          : [...selectedExams, exam.value],
                        selectedSlots,
                        selectedYears,
                        selectedCampuses,
                        selectedSemesters,
                        selectedAnswerKeyIncluded,
                      )
                    }
                    className={`font-play mb-2 mr-2 flex h-fit cursor-pointer items-center rounded-full border-2 border-black px-2 py-1 text-xs font-semibold hover:bg-slate-800 hover:text-white dark:hover:bg-slate-900 ${selectedExams.includes(exam.value) ? "border-[#B2B8FF] bg-[#B2B8FF] dark:border-[#434dba] dark:bg-[#434dba]" : "bg-none dark:border-white"}`}
                  >
                    {exam.label}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Add slots/years/semesters below as needed, same as above */}
      </div>
    </div>
  );
}

export default SideBar;