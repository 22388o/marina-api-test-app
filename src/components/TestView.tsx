import React from "react";
import { TestResult } from "../runner/types";

const TestView: React.FC<TestResult & { index: number }> = ({
  name,
  error,
  index,
}) => {
  return (
    <div>
      <p>
        {index} {name}
      </p>
      {error && <p>{error}</p>}
    </div>
  );
};

export default TestView;
