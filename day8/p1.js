const fs = require("fs");
const { toArray, uniq } = require("lodash");

const input = fs.readFileSync("input.txt", "utf8");

const trees = input.split("\n").map(toArray);

const result = [];

function fromLeft(trees) {
  for (i = 0; i < trees.length; i++) {
    let max = -1;
    for (j = 0; j < trees[0].length; j++) {
      if (trees[i][j] > max) {
        result.push(`${i},${j}`);
        max = trees[i][j];
      }
    }
  }
}

function fromRight(trees) {
  for (i = 0; i < trees.length; i++) {
    let max = -1;
    for (j = trees[0].length - 1; j >= 0; j--) {
      if (trees[i][j] > max) {
        result.push(`${i},${j}`);
        max = trees[i][j];
      }
    }
  }
}

function fromTop(trees) {
  for (i = 0; i < trees.length; i++) {
    let max = -1;
    for (j = 0; j < trees.length; j++) {
      if (trees[j][i] > max) {
        result.push(`${j},${i}`);
        max = trees[j][i];
      }
    }
  }
}

function fromBottom(trees) {
  for (i = 0; i < trees.length; i++) {
    let max = -1;
    for (j = trees[0].length - 1; j >= 0; j--) {
      if (trees[j][i] > max) {
        result.push(`${j},${i}`);
        max = trees[j][i];
      }
    }
  }
}

fromLeft(trees);
fromRight(trees);
fromTop(trees);
fromBottom(trees);

console.log(uniq(result).length);

// console.log(out);
