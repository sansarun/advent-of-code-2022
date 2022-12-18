const fs = require("fs");
const { fill, toNumber, take, drop, dropRight } = require("lodash");

const input = fs.readFileSync("input.txt", "utf8");

cave = [...Array(600).keys()].map((e) => fill(new Array(600), "."));

cave[500][0] = "+";

rocks = input
  .split("\n")
  .map((line) =>
    line.split(" -> ").map((coor) => coor.split(",").map(toNumber))
  );

function genPoints(x1, y1, x2, y2) {
  x = x1;
  y = y1;
  points = [[x, y]];

  while (x != x2 || y != y2) {
    if (x < x2) x = x + 1;
    if (x > x2) x = x - 1;
    if (y < y2) y = y + 1;
    if (y > y2) y = y - 1;
    points.push([x, y]);
  }
  return points;
}

rocks.forEach((lines) => {
  for (i = 0; i < lines.length - 1; i++) {
    coords = genPoints(
      lines[i][0],
      lines[i][1],
      lines[i + 1][0],
      lines[i + 1][1]
    );
    coords.forEach(([x, y]) => {
      cave[x][y] = "#";
    });
  }
});

function printCave() {
  output = cave;
  output = drop(output, 470);
  output = dropRight(output, 20);
  output = output[0].map((_, colIndex) => output.map((row) => row[colIndex]));
  output = take(output, 200);
  for (i = 0; i < output.length; i++) {
    console.log(output[i].join(""));
  }
  console.log("\n");
}

function pourSand() {
  let [x, y] = [500, 0];
  cave[x][y] = "o";
  // printCave();

  for (j = 0; j < 2000; j++) {
    if (cave[x][y + 1] == ".") {
      cave[x][y] = ".";
      y = y + 1;
      cave[x][y] = "o";
    } else if (cave[x - 1][y + 1] == ".") {
      cave[x][y] = ".";
      y = y + 1;
      x = x - 1;
      cave[x][y] = "o";
    } else if (cave[x + 1][y + 1] == ".") {
      cave[x][y] = ".";
      y = y + 1;
      x = x + 1;
      cave[x][y] = "o";
    } else {
      return false;
    }

    if (y > 200) {
      return true;
    }
  }
  return true;
}

for (z = 0; z < 1000; z++) {
  result = pourSand();
  if (result) {
    console.log(z);
    break;
  }
}
