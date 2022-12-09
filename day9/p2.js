const fs = require("fs");
const { uniq } = require("lodash");

const input = fs.readFileSync("input.txt", "utf8");

knots = [
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
];

const tailPositions = [];

function moveHead(direction) {
  if (direction == "R") {
    knots[0]["x"] = knots[0]["x"] + 1;
  } else if (direction == "L") {
    knots[0]["x"] = knots[0]["x"] - 1;
  } else if (direction == "U") {
    knots[0]["y"] = knots[0]["y"] + 1;
  } else if (direction == "D") {
    knots[0]["y"] = knots[0]["y"] - 1;
  }
}

function isAdjacent(head, tail) {
  dx = Math.abs(head["x"] - tail["x"]);
  dy = Math.abs(head["y"] - tail["y"]);
  return dx <= 1 && dy <= 1;
}

function updateKnot(index) {
  aheadKnot = knots[index - 1];
  currentKnot = knots[index];

  if (!isAdjacent(aheadKnot, currentKnot)) {
    dx = aheadKnot["x"] - currentKnot["x"];
    dy = aheadKnot["y"] - currentKnot["y"];

    switch (`${dx},${dy}`) {
      case "0,2":
        knots[index]["y"] = currentKnot["y"] + 1;
        break;
      case "0,-2":
        knots[index]["y"] = currentKnot["y"] - 1;
        break;
      case "2,0":
        knots[index]["x"] = currentKnot["x"] + 1;
        break;
      case "-2,0":
        knots[index]["x"] = currentKnot["x"] - 1;
        break;
      case "1,2":
      case "2,1":
      case "2,2":
        knots[index]["x"] = currentKnot["x"] + 1;
        knots[index]["y"] = currentKnot["y"] + 1;
        break;
      case "-2,1":
      case "-1,2":
      case "-2,2":
        knots[index]["x"] = currentKnot["x"] - 1;
        knots[index]["y"] = currentKnot["y"] + 1;
        break;
      case "2,-1":
      case "1,-2":
      case "2,-2":
        knots[index]["x"] = currentKnot["x"] + 1;
        knots[index]["y"] = currentKnot["y"] - 1;
        break;
      case "-1,-2":
      case "-2,-2":
      case "-2,-1":
        knots[index]["x"] = currentKnot["x"] - 1;
        knots[index]["y"] = currentKnot["y"] - 1;
        break;
    }
  }
}

input.split("\n").forEach((line) => {
  const [direction, step] = line.split(" ");
  for (i = 0; i < step; i++) {
    moveHead(direction);
    for (k = 1; k < 10; k++) {
      updateKnot(k);
    }
    tailPositions.push(`${knots[9]["x"]},${knots[9]["y"]}`);
  }
});

console.log(uniq(tailPositions).length); //2493
