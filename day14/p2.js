const fs = require("fs");
const {
  fill,
  toNumber,
  take,
  drop,
  dropRight,
  flatten,
  max,
} = require("lodash");

const input = fs.readFileSync("input.txt", "utf8");

cave = [...Array(2000).keys()].map((e) => fill(new Array(2000), "."));

cave[500][0] = "+";

rocks = input
  .split("\n")
  .map((line) =>
    line.split(" -> ").map((coor) => coor.split(",").map(toNumber))
  );

y_max = max(flatten(rocks.map((l) => l.map((e) => e[1])))) + 2;

for (let x = 0; x < cave.length; x++) {
  cave[x][y_max] = "#";
}

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
  output = drop(output, 0);
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

  for (j = 0; j < 4000; j++) {
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
      if ((x = 500 && y == 0)) {
        return true;
      } else {
        return false;
      }
    }
  }
  return true;
}

for (z = 0; z < 30000; z++) {
  result = pourSand();
  if (result) {
    console.log(z + 1);
    break;
  }
}

//27155
printCave();
