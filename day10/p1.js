const { assert } = require("console");
const fs = require("fs");
const { toNumber } = require("lodash");

const input = fs.readFileSync("input.txt", "utf8");

let cycle = 0;
let x = 1;
let sum = 0;

function endCycle() {
  cycle = cycle + 1;
  if ((cycle - 20) % 40 == 0) {
    sum = sum + cycle * x;
  }
}

input.split("\n").forEach((line) => {
  if (line == "noop") {
    endCycle();
  } else {
    const operand = toNumber(line.split(" ")[1]);
    endCycle();
    x = x + operand;
    endCycle();
  }
});

assert(sum == 14240);
