import { AlertCircle } from "lucide-react";

export default function Banner() {
  return (
    <div className="z-50 flex h-fit w-full items-center justify-center bg-[#ba4343] px-6 py-3 text-white sm:h-14 sm:py-0 md:sticky md:top-0">
      <div className="flex w-full flex-col items-center md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          <AlertCircle className="mr-2 h-5 w-5 flex-shrink-0" />
          <div className="text-center md:text-left">
            <span className="font-medium">Site is under maintenance!</span>
          </div>
        </div>

        <div className="text-center md:text-sm text-xs md:text-right">
          Some papers may not be available. Please check back in an hour.
        </div>
      </div>
    </div>
  );
}