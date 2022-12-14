const fs = require("fs");
const { toNumber, flatten, concat, groupBy } = require("lodash");

const input = fs.readFileSync("input.txt", "utf8");

map = input.split("\n").map((l) => l.split(""));

rowMax = map.length - 1;
colMax = map[0].length - 1;

start = null;

for (i = 0; i <= rowMax; i++) {
  for (j = 0; j <= colMax; j++) {
    if (map[i][j] == "E") {
      start = `${i},${j}`;
      map[i][j] = "z";
    }
  }
}

paths = [
  {
    steps: new Set([start]),
    current: start,
  },
];

answer = -1;

for (round = 0; round < 500; round++) {
    console.log(round);
  for (i = 0; i < paths.length; i++) {
    path = paths[i];
    nexts = nextSteps(path["current"], path["steps"]);

    if (nexts == 999) {
      answer = path["steps"].size;
      break;
    }

    paths[i] = nexts.map((next) => {
      x = new Set(path["steps"]);
      x.add(next);
      return {
        steps: x,
        current: next,
      };
    });
  }
  if (answer != -1) break;

  paths = flatten(paths);
  const groups = groupBy(paths, (p) => {
    return p["current"];
  });
  paths = Object.keys(groups).map((key) => {
    return {
      current: key,
      steps: groups[key][0]["steps"],
    };
  });
}

console.log(answer);

function nextSteps(cur, past) {
  let [row, col] = cur.split(",");
  row = toNumber(row);
  col = toNumber(col);

  const nextHeight = map[row][col].charCodeAt(0) - 1;
  result = [];
  //left

  if (col > 0 && map[row][col - 1].charCodeAt(0) >= nextHeight) {
    if (map[row][col - 1].charCodeAt(0) == 97) return 999;
    const x = `${row},${col - 1}`;
    if (!past.has(x)) result.push(x);
  }

  //right

  if (col < colMax && map[row][col + 1].charCodeAt(0) >= nextHeight) {
    if (map[row][col + 1].charCodeAt(0) == 97) return 999;
    const x = `${row},${col + 1}`;
    if (!past.has(x)) result.push(x);
  }

  //up
  if (row > 0 && map[row - 1][col].charCodeAt(0) >= nextHeight) {
    if (map[row - 1][col].charCodeAt(0) == 97) return 999;
    const x = `${row - 1},${col}`;
    if (!past.has(x)) result.push(x);
  }

  //down

  if (row < rowMax && map[row + 1][col].charCodeAt(0) >= nextHeight) {
    if (map[row + 1][col].charCodeAt(0) == 97) return 999;
    const x = `${row + 1},${col}`;
    if (!past.has(x)) result.push(x);
  }

  return result;
}
