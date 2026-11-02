import { spawnSync } from "node:child_process";

// Usage: node scripts/run-tests.mjs <all|unit|e2e> [test name]
// A shared script because `npm test -- "name"` must reach both levels, and
// Vitest and Playwright use different flags for filtering by name.
const [level, name] = process.argv.slice(2);

function run(args, options) {
  return spawnSync("npx", ["--no-install", ...args], options);
}

function list(args) {
  return run(args, { encoding: "utf8" }).stdout;
}

const unitFilter = name ? ["-t", name] : [];
const e2eFilter = name ? ["-g", name] : [];

const unit = {
  label: "unit",
  hasTests: () => list(["vitest", "list", ...unitFilter]).trim() !== "",
  run: () => run(["vitest", "run", ...unitFilter], { stdio: "inherit" }).status === 0,
};

const e2e = {
  label: "browser",
  // Listing first means a run with nothing to test doesn't pay for a build.
  hasTests: () => !list(["playwright", "test", "--list", "--pass-with-no-tests", ...e2eFilter]).includes("Total: 0 tests"),
  run: () => run(["playwright", "test", ...e2eFilter], { stdio: "inherit" }).status === 0,
};

const levels = { unit: [unit], e2e: [e2e], all: [unit, e2e] }[level];
const found = levels.filter((candidate) => candidate.hasTests());

// A name only has to match at one level, but with no name every level needs
// tests: finding none means a mistyped name or a test in the wrong place.
const missing = name ? (found.length === 0 ? levels : []) : levels.filter((candidate) => !found.includes(candidate));
if (missing.length > 0) {
  const where = missing.map((candidate) => candidate.label).join(" or ");
  console.error(`No ${where} tests found${name ? ` matching "${name}"` : ""}.`);
  process.exit(1);
}

// Run every level even after a failure, so one run reports everything that broke.
const results = found.map((candidate) => candidate.run());

process.exit(results.every(Boolean) ? 0 : 1);
