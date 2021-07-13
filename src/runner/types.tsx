export type TestFunction = () => Promise<void>;

export interface Test {
  name: string;
  function: TestFunction;
}

export interface TestResult {
  name: string;
  success: boolean;
  error?: string;
}

export interface RunnerResult {
  success: number;
  fail: number;
}
