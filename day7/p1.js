const { assert } = require("console");
const fs = require("fs");
const { dropRight, toNumber, take, chain } = require("lodash");

const input = fs.readFileSync("input.txt", "utf8");

function changeCurrentDir(currentDir, cdCommand) {
  const [, , newDir] = cdCommand.split(" ");
  if (newDir == "..") {
    return dropRight(currentDir.split("/"), 1).join("/");
  } else if (newDir == "/") {
    return "";
  } else {
    return currentDir + "/" + newDir;
  }
}

function dirAndParents(currentDir) {
  return currentDir.split("/").reduce((acc, _, index, array) => {
    acc.push(take(array, index + 1).join("/"));
    return acc;
  }, []);
}

function isFile(line) {
  return /\d+/.test(line);
}

let currentDir = "";
const dirs = {};
input.split("\n").forEach((line) => {
  if (line.startsWith("$ cd")) {
    currentDir = changeCurrentDir(currentDir, line);
  } else if (isFile(line)) {
    const size = toNumber(line.split(" ")[0]);
    dirAndParents(currentDir).forEach((dir) => {
      if (dir in dirs) {
        dirs[dir] = dirs[dir] + size;
      } else {
        dirs[dir] = size;
      }
    });
  }
});

const answer = chain(Object.values(dirs))
  .filter((size) => size < 100000)
  .sum()
  .value();

assert(answer == 1449447);
