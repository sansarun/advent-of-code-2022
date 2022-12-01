const _ = require("lodash");

const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

const elvesCalories = input.split("\n\n").map(sumCalories);

function sumCalories(caloriesString) {
  return _.sum(caloriesString.split("\n").map((cal) => Number(cal)));
}

topCalories = _.max(elvesCalories);
console.log(topCalories);
