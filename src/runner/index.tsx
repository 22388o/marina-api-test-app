import { RunnerResult, Test, TestResult } from "./types";

/**
 * Async generator running test.
 * yield the test results.
 * return the Runner result at the end.
 * @param tests an array of tests
 */
export async function* testRunner(tests: Test[]) {
  const result: RunnerResult = {
    fail: 0,
    success: 0,
  };

  for (const test of tests) {
    const testResult = await runTest(test);

    if (testResult.success) {
      result.success = result.success + 1;
    } else {
      result.fail = result.fail + 1;
    }

    yield testResult;
  }

  return result;
}

async function runTest(test: Test): Promise<TestResult> {
  let error = undefined;
  let success = true;

  try {
    await test.function();
  } catch (e) {
    error = e.message;
    success = false;
  }

  return { name: test.name, error, success };
}
