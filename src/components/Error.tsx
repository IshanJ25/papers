import React from "react";

interface ErrorProps {
  message?: string;
}

const Error = ({ message = "Some error occured" }: ErrorProps) => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="-mt-32 text-center text-lg">
        {message}
      </div>
    </div>
  );
};

export default Error;