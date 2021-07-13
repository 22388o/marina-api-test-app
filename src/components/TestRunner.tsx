import { useState } from "react";
import { testRunner } from "../runner";
import { Test, TestResult } from "../runner/types";
import TestView from "./TestView";

export interface RunnerProps {
  tests: Test[];
}

const Runner: React.FC<RunnerProps> = ({ tests }) => {
  const [results, setResults] = useState<TestResult[]>([]);

  const runTests = async () => {
    setResults([]);
    for await (const testResult of testRunner(tests)) {
      setResults((r) => r.concat([testResult]));
    }
  };

  const views = results.map((result, index) => (
    <TestView key={index} index={index} {...result} />
  ));

  return (
    <div>
      <div>
        <button onClick={runTests}>RUN</button>
      </div>
      <div>{views}</div>
    </div>
  );
};

export default Runner;
