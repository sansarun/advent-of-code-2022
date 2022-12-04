const fs = require("fs");
const { toNumber, chain } = require("lodash");

const input = fs.readFileSync("input.txt", "utf8");

function isOverlap([min1, max1, min2, max2]) {
  return (max1 >= min2 && min1 <= max2) || (max2 >= min1 && min2 <= max1);
}

function parseInput(input) {
  return input.split("\n").map((line) => line.split(/[-,]/).map(toNumber));
}

const count = chain(parseInput(input)).map(isOverlap).compact().value().length;

console.log(count); //808
