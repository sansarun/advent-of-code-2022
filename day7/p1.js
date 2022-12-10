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

function dirsInHierarchy(currentDir) {
  return currentDir.split("/").reduce((acc, _, index, array) => {
    acc.push(take(array, index + 1).join("/"));
    return acc;
  }, []);
}

let currentDir = "";
const dirs = {};
input.split("\n").forEach((line) => {
  if (line.startsWith("$ cd")) {
    currentDir = changeCurrentDir(currentDir, line);
  } else if (line.startsWith("$ ls")) {
    // do nothing
  } else {
    if (!line.startsWith("dir ")) {
      const size = toNumber(line.split(" ")[0]);
      dirsInHierarchy(currentDir).forEach((dir) => {
        if (dir in dirs) {
          dirs[dir] = dirs[dir] + size;
        } else {
          dirs[dir] = size;
        }
      });
    }
  }
});

const answer = chain(Object.values(dirs))
  .filter((size) => size < 100000)
  .sum()
  .value();

assert(answer == 1449447);
