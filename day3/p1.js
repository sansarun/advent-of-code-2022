const fs = require("fs");
const { chunk, uniq, intersection, chain, toArray } = require("lodash");

const input = fs.readFileSync("input.txt", "utf8");

function parseInput(input) {
  return input.split("\n").map(toArray);
}

function findDuplicate(sack) {
  const [compartment1, compartment2] = chunk(sack, sack.length / 2);
  return uniq(intersection(compartment1, compartment2))[0];
}

function priority(char) {
  const code = char.charCodeAt(0);
  return char >= "a" ? code - 96 : code - 38;
}

const sum = chain(parseInput(input))
  .map(findDuplicate)
  .map(priority)
  .sum()
  .value();

console.log(sum); //7824
