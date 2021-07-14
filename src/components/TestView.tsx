import classNames from "classnames";
import React from "react";
import { TestResult } from "../runner/types";

const successIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="white"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const failIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="white"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clipRule="evenodd"
    />
  </svg>
);

const TestView: React.FC<TestResult & { index: number }> = ({
  name,
  error,
  success,
  index,
}) => {
  return (
    <div
      className={classNames(
        "mb-2 w-106 flex flex-row justify-between m-auto bg-gradient-to-r  p-6 gap-8 rounded-lg border-2 ",
        {
          "from-green-700 via-green-800 to-green-900 border-green-500": success,
        },
        {
          "from-red-700 via-red-800 to-red-900 border-red-500": !success,
        }
      )}
    >
      <div className="text-left my-auto">
        <div className="text-lg text-white-500 font-light">{name}</div>
        {!success && (
          <div className="mt-1">
            <div className="text-sm text-purple-100 font-bold">Error:</div>
            <div className="text-xs text-purple-100">{error}</div>
          </div>
        )}
      </div>
      {success ? successIcon : failIcon}
    </div>
  );
};

export default TestView;
