const _ = require("lodash");

const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

function findDuplicate(sack) {
  const len = sack.length;
  const first = sack.substring(0, len / 2).split("");
  const second = sack.substring(len / 2).split("");
  const duplicate = _.uniq(first.filter((c) => second.indexOf(c) != -1));
  return duplicate[0];
}

function toNumber(c) {
  const code = c.charCodeAt(0);
  if (code >= 97) return code - 96;
  else return code - 38;
}

const duplicates = input.split("\n").map(findDuplicate);
const sum = _.sum(duplicates.map(toNumber));

console.log(sum); //7824
