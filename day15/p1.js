const fs = require("fs");
const { toNumber, uniq, filter } = require("lodash");
const input = fs.readFileSync("input.txt", "utf8");

const sensors = input.split("\n").map((line) => {
  const [, sx, sy, bx, by] = line.match(
    /Sensor at x=([+-]?\d+), y=([+-]?\d+): closest beacon is at x=([+-]?\d+), y=([+-]?\d+)/
  );
  return {
    sx: toNumber(sx),
    sy: toNumber(sy),
    bx: toNumber(bx),
    by: toNumber(by),
    distance: distance(sx, sy, bx, by),
  };
});

const becons = new Set(sensors.map((s) => `${s.bx},${s.by}`));

function distance(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

min_x = sensors
  .map((s) => (s.sx < s.bx ? s.sx - s.distance : s.bx - s.distance))
  .sort((a, b) => a - b)[0];
max_x = sensors
  .map((s) => (s.sx > s.bx ? s.sx + s.distance : s.bx + s.distance))
  .sort((a, b) => b - a)[0];

function checkSensor(min_x, max_x, sx, sy, sensorDistance) {
  result = [];
  y = 2000000;
  x = min_x;
  while (x <= max_x) {
    if (distance(sx, sy, x, y) <= sensorDistance) {
      co = `${x},${y}`;
      if (!becons.has(co)) result.push(`${x},${y}`);
    }
    x = x + 1;
  }
  return result;
}

const final = new Set();
sensors.forEach((sensor) => {
  const result = checkSensor(
    min_x,
    max_x,
    sensor.sx,
    sensor.sy,
    sensor.distance
  );

  result.forEach((r) => final.add(r));
});

console.log(final.size);
