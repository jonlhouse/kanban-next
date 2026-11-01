import { spawnSync } from "node:child_process";

// Usage: node scripts/run-tests.mjs <all|unit|e2e> [test name]
// A shared script because `npm test -- "name"` must reach both levels, and
// Vitest and Playwright use different flags for filtering by name.
const [level, name] = process.argv.slice(2);

function run(args, options) {
  return spawnSync("npx", ["--no-install", ...args], options);
}

function runUnit() {
  return run(["vitest", "run", ...(name ? ["-t", name] : [])], { stdio: "inherit" }).status === 0;
}

function runE2e() {
  const filter = name ? ["-g", name] : [];
  // Playwright passes silently when it finds no tests, after building the app.
  const listed = run(["playwright", "test", "--list", "--pass-with-no-tests", ...filter], {
    encoding: "utf8",
  });
  if (listed.stdout.includes("Total: 0 tests")) {
    console.log("No browser tests found.");
    return true;
  }
  return run(["playwright", "test", ...filter], { stdio: "inherit" }).status === 0;
}

const levels = { unit: [runUnit], e2e: [runE2e], all: [runUnit, runE2e] }[level];

// Run every level even after a failure, so one run reports everything that broke.
const results = levels.map((runLevel) => runLevel());

process.exit(results.every(Boolean) ? 0 : 1);
