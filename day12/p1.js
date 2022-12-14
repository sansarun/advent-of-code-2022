const fs = require("fs");
const { toNumber, flatten, concat, groupBy } = require("lodash");

const input = fs.readFileSync("input.txt", "utf8");

map = input.split("\n").map((l) => l.split(""));

rowMax = map.length - 1;
colMax = map[0].length - 1;

start = null;
end = null;

for (i = 0; i <= rowMax; i++) {
  for (j = 0; j <= colMax; j++) {
    if (map[i][j] == "S") {
      start = `${i},${j}`;
      map[i][j] = "a";
    }
    if (map[i][j] == "E") {
      end = `${i},${j}`;
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

for (round = 0; round < 1000; round++) {
  console.log(round, paths.length);
  for (i = 0; i < paths.length; i++) {
    path = paths[i];
    nexts = nextSteps(path["current"], path["steps"]);

    if (nexts.indexOf(end) != -1) {
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

  const nextHeight = map[row][col].charCodeAt(0) + 1;
  result = [];
  //left
  if (col > 0 && map[row][col - 1].charCodeAt(0) <= nextHeight) {
    const x = `${row},${col - 1}`;
    if (!past.has(x)) result.push(x);
  }

  //right
  if (col < colMax && map[row][col + 1].charCodeAt(0) <= nextHeight) {
    const x = `${row},${col + 1}`;
    if (!past.has(x)) result.push(x);
  }

  //up
  if (row > 0 && map[row - 1][col].charCodeAt(0) <= nextHeight) {
    const x = `${row - 1},${col}`;
    if (!past.has(x)) result.push(x);
  }

  //down
  if (row < rowMax && map[row + 1][col].charCodeAt(0) <= nextHeight) {
    const x = `${row + 1},${col}`;
    if (!past.has(x)) result.push(x);
  }

  return result;
}
