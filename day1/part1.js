const _ = require("lodash");

const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

const elves_cal = input.split("\n\n").map((calsString) => {
  return _.sum(calsString.split("\n").map((cal) => Number(cal)));
});

top_cal = _.max(elves_cal)
console.log(top_cal);