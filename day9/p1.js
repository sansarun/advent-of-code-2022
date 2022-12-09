const fs = require("fs");
const { uniq } = require("lodash");

const input = fs.readFileSync("input.txt", "utf8");

let head = { x: 0, y: 0 };
let tail = { x: 0, y: 0 };

let previousHead = { x: 0, y: 0 };

const tailPositions = [];

function moveHead(direction) {
  previousHead["x"] = head["x"];
  previousHead["y"] = head["y"];

  if (direction == "R") {
    head["x"] = head["x"] + 1;
  } else if (direction == "L") {
    head["x"] = head["x"] - 1;
  } else if (direction == "U") {
    head["y"] = head["y"] + 1;
  } else if (direction == "D") {
    head["y"] = head["y"] - 1;
  }
}

function isAdjacent(head, tail) {
  dx = Math.abs(head["x"] - tail["x"]);
  dy = Math.abs(head["y"] - tail["y"]);
  return dx <= 1 && dy <= 1;
}

function upateTail() {
  if (!isAdjacent(head, tail)) {
    tail["x"] = previousHead["x"];
    tail["y"] = previousHead["y"];
  }
}

input.split("\n").forEach((line) => {
  const [direction, step] = line.split(" ");

  for (i = 0; i < step; i++) {
    moveHead(direction);
    upateTail();
    tailPositions.push(`${tail["x"]},${tail["y"]}`);
  }
});

console.log(uniq(tailPositions).length); //6087
