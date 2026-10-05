import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const baselineDir = process.env.BASELINE_DIR ?? "/tmp/tech-essence-deck-vite-baseline";
const candidateDir = process.env.CANDIDATE_DIR ?? "/tmp/tech-essence-deck-next";
const diffDir = process.env.DIFF_DIR;
const allowedRatio = Number(process.env.MAX_DIFF_RATIO ?? "0.005");

const filenames = (await readdir(baselineDir))
  .filter((filename) => filename.endsWith(".png"))
  .sort();

if (diffDir) await mkdir(diffDir, { recursive: true });

function placeOnCanvas(source, width, height) {
  const canvas = new PNG({ width, height, fill: true });
  canvas.data.fill(0);
  for (let index = 3; index < canvas.data.length; index += 4) canvas.data[index] = 255;
  for (let y = 0; y < source.height; y += 1) {
    const sourceStart = y * source.width * 4;
    const targetStart = y * width * 4;
    source.data.copy(canvas.data, targetStart, sourceStart, sourceStart + source.width * 4);
  }
  return canvas;
}

const results = [];

for (const filename of filenames) {
  const baseline = PNG.sync.read(await readFile(path.join(baselineDir, filename)));
  const candidate = PNG.sync.read(await readFile(path.join(candidateDir, filename)));
  const width = Math.max(baseline.width, candidate.width);
  const height = Math.max(baseline.height, candidate.height);
  const baselineCanvas = placeOnCanvas(baseline, width, height);
  const candidateCanvas = placeOnCanvas(candidate, width, height);
  const diff = new PNG({ width, height });
  const changedPixels = pixelmatch(
    baselineCanvas.data,
    candidateCanvas.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 },
  );
  const ratio = changedPixels / (width * height);
  results.push({
    filename,
    ratio,
    changedPixels,
    dimensionsMatch: baseline.width === candidate.width && baseline.height === candidate.height,
    baseline: `${baseline.width}x${baseline.height}`,
    candidate: `${candidate.width}x${candidate.height}`,
  });
  if (diffDir && ratio > allowedRatio) {
    await writeFile(path.join(diffDir, filename), PNG.sync.write(diff));
  }
}

const failures = results.filter((result) => result.ratio > allowedRatio);
const summary = {
  allowedRatio,
  compared: results.length,
  failures: failures.length,
  maximumRatio: Math.max(...results.map((result) => result.ratio)),
  results,
};

console.log(JSON.stringify(summary, null, 2));
if (failures.length > 0) process.exitCode = 1;
