const _ = require("lodash");

const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

function findDuplicate(sacks) {
  const [first, second, third] = sacks.map((sack) => sack.split(""));
  const duplicate = _.uniq(
    first.filter((c) => second.indexOf(c) != -1 && third.indexOf(c) != -1)
  );
  return duplicate[0];
}

function toNumber(c) {
  const code = c.charCodeAt(0);
  if (code >= 97) return code - 96;
  else return code - 38;
}

const duplicates = _.chunk(input.split("\n"), 3).map(findDuplicate);
const sum = _.sum(duplicates.map(toNumber));

console.log(sum); //2798
