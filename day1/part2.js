const _ = require("lodash");

const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

const elves_cal = input
  .split("\n\n")
  .map((calsString) => _.sum(calsString.split("\n").map((cal) => Number(cal))));

sum_top3_cal = _.sum(_.takeRight(elves_cal.sort(), 3));
console.log(sum_top3_cal);
