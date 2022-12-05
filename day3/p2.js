const fs = require("fs");
const { chain, toArray, intersection } = require("lodash");

const input = fs.readFileSync("input.txt", "utf8");

function parseInput(input) {
  return input.split("\n").map(toArray);
}

function priority(char) {
  const code = char.charCodeAt(0);
  return char >= "a" ? code - 96 : code - 38;
}

const sum = chain(parseInput(input))
  .chunk(3)
  .map((sackGroup) => intersection(...sackGroup)[0])
  .map(priority)
  .sum()
  .value();

console.log(sum); //2798
