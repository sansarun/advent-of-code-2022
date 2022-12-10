const fs = require("fs");
const { dropRight, toNumber, take, chain } = require("lodash");

const input = fs.readFileSync("input.txt", "utf8");

let currentDir = "";

const dirs = {};

input.split("\n").forEach((line) => {
  if (line.startsWith("$ cd")) {
    const [, , dir] = line.split(" ");
    if (dir == "..") {
      currentDir = dropRight(currentDir.split("/"), 1).join("/");
      if (currentDir == "") {
        currentDir = "/";
      }
    } else {
      if (dir == "/") {
        currentDir = "/";
      } else if (currentDir == "/") {
        currentDir = "/" + dir;
      } else {
        currentDir = currentDir + "/" + dir;
      }
    }
  } else if (line.startsWith("$ ls")) {
  } else {
    if (!line.startsWith("dir ")) {
      const size = toNumber(line.split(" ")[0]);
      var paths = currentDir.split("/");
      if (paths[0] == "" && paths[1] == "") {
        paths = [""];
      }

      for (i = 1; i <= paths.length; i++) {
        var p = take(paths, i).join("/");
        if (p == "") {
          p = "/";
        }

        if (p in dirs) {
          dirs[p] = dirs[p] + size;
        } else {
          dirs[p] = size;
        }
      }
    }
  }
});

console.log(dirs);

unused = 70000000 - dirs["/"];

need = 30000000 - unused;

console.log(need);

sizes = Object.values(dirs).sort(function (a, b) {
  return a - b;
});

for (i = 0; i < sizes.length; i++) {
  if (sizes[i] >= need) {
    console.log(sizes[i]);
    break;
  }
}
