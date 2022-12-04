const { toNumber, chain } = require("lodash");
const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

function parseInput(input) {
  return input.split("\n").map((line) => line.split(/[-,]/).map(toNumber));
}

function isFullyContains([min1, max1, min2, max2]) {
  return (min1 <= min2 && max1 >= max2) || (min2 <= min1 && max2 >= max1);
}

const count = chain(parseInput(input))
  .map(isFullyContains)
  .compact()
  .value().length;

console.log(count); //456
