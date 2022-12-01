const _ = require("lodash");

const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

const elvesCalories = input.split("\n\n").map(sumCalories);

function sumCalories(caloriesString) {
  return _.sum(caloriesString.split("\n").map((cal) => Number(cal)));
}

sumTop3Calories = _.sum(_.takeRight(elvesCalories.sort(), 3));
console.log(sumTop3Calories);
