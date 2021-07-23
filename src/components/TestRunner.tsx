import { useState } from "react";
import { testRunner } from "../runner";
import { Test, TestResult } from "../runner/types";
import { getMarina } from "../utils/marina";
import TestView from "./TestView";

export interface RunnerProps {
  tests: Test[];
}

const Runner: React.FC<RunnerProps> = ({ tests }) => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [marinaIsLoading, setMarinaIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(undefined);

  const before = async () => {
    try {
      setMarinaIsLoading(true);
      const marina = await getMarina();
      const isEnabled = await marina.isEnabled();
      if (!isEnabled) {
        await marina.enable();
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || err);
    } finally {
      setMarinaIsLoading(false);
    }
  };

  const runTests = async () => {
    if (isLoading || marinaIsLoading) return;
    setErrorMsg(undefined);
    setIsLoading(true);
    try {
      setResults([]);
      for await (const testResult of testRunner(tests, before)) {
        setResults((r) => r.concat([testResult]));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const views = results.map((result, index) => (
    <span className={result.success ? "success" : "error"}>
      <TestView key={index} index={index} {...result} />
    </span>
  ));

  return (
    <div className="flex flex-row-reverse justify-between">
      <div>
        <div className="flex flex-col-reverse">
          {isLoading && (
            <span className="text-sm text-center m-2 pb-3 animate-pulse">
              tests are loading...
            </span>
          )}
          {marinaIsLoading && (
            <span className="text-sm text-center m-2 pb-3 animate-pulse">
              Trying to access your Marina...
            </span>
          )}
          {errorMsg && (
            <span className="text-sm text-center m-2 pb-3">{errorMsg}</span>
          )}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3"
            onClick={runTests}
            disabled={isLoading}
          >
            RUN
          </button>
        </div>
      </div>
      <div className="ml-3">{views}</div>
    </div>
  );
};

export default Runner;
