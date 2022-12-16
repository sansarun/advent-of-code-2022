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

function distance(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function checkSensorIn(x, y) {
  if (x < 0 || x > 4000000 || y < 0 || y > 4000000) return true;
  for (i = 0; i < sensors.length; i++) {
    sensor = sensors[i];
    dis = distance(x, y, sensor.sx, sensor.sy);
    if (dis <= sensor.distance) {
      return true;
    }
  }
  return false;
}

function checkBorder(x, y) {
  if (!checkSensorIn(x - 1, y)) return [x - 1, y];
  if (!checkSensorIn(x + 1, y)) return [x + 1, y];
  if (!checkSensorIn(x, y + 1)) return [x, y + 1];
  if (!checkSensorIn(x, y - 1)) return [x, y - 1];
}

function border({ sx, sy, distance }) {
  x_min = sx - distance;
  x_max = sx + distance;
  y_min = sy - distance;
  y_max = sy + distance;

  let [x, y] = [sx, y_min];

  tmp = checkBorder(x, y);
  if (tmp != null) return tmp;
  while (x < x_max) {
    x = x + 1;
    y = y + 1;
    tmp = checkBorder(x, y);
    if (tmp != null) return tmp;
  }
  while (y < y_max) {
    x = x - 1;
    y = y + 1;
    tmp = checkBorder(x, y);
    if (tmp != null) return tmp;
  }
  while (x > x_min) {
    x = x - 1;
    y = y - 1;
    tmp = checkBorder(x, y);
    if (tmp != null) return tmp;
  }
  while (y > y_min) {
    x = x + 1;
    y = y - 1;
    tmp = checkBorder(x, y);
    if (tmp != null) return tmp;
  }

  return null;
}

for (s = 0; s < sensors.length; s++) {
  x = border(sensors[s]);
  if (x !== null) {
    console.log(x[0] * 4000000 + x[1]); //10996191429555
    break;
  }
}
