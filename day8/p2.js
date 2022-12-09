const fs = require("fs");
const { toArray } = require("lodash");

const input = fs.readFileSync("input.txt", "utf8");

const trees = input.split("\n").map(toArray);
const width = trees.length;

let max = -1;

for (i = 0; i < width; i++) {
  for (j = 0; j < width; j++) {
    let left = 0;
    if (j > 0) {
      for (p = j - 1; p >= 0; p--) {
        if (trees[i][p] < trees[i][j]) {
          left++;
        } else {
          left++;
          break;
        }
      }
    }

    let right = 0;
    if (j < width - 1) {
      for (p = j + 1; p < width; p++) {
        if (trees[i][p] < trees[i][j]) {
          right++;
        } else {
          right++;
          break;
        }
      }
    }

    let down = 0;
    if (i < width - 1) {
      for (p = i + 1; p < width; p++) {
        if (trees[p][j] < trees[i][j]) {
          down++;
        } else {
          down++;
          break;
        }
      }
    }

    let up = 0;
    if (i > 0) {
      for (p = i - 1; p >= 0; p--) {
        if (trees[p][j] < trees[i][j]) {
          up++;
        } else {
          up++;
          break;
        }
      }
    }

    const sum = left * right * down * up;
    if (sum > max) {
      max = sum;
    }
  }
}

console.log(max);
