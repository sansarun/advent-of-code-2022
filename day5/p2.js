const fs = require("fs");
const { chunk, takeRight, concat, reverse } = require("lodash");

const input = fs.readFileSync("input.txt", "utf8");

const [initialState, instructions] = input.split("\n\n");

let total = [];

initialState.split("\n").forEach((line) => {
  const x = chunk(line, 4).map((l) => l.filter((c) => c >= "A" && c <= "Z")[0]);
  x.forEach((item, index) => {
    if (item) {
      if (!total[index]) {
        total[index] = [item];
      } else {
        total[index].push(item);
      }
    }
  });
});

total = total.map((l) => reverse(l));
// console.log(total);

instructions.split("\n").forEach((int) => {
//   console.log(int);
  const [amount, from, to] = int.match(/\d+/g);

  x = takeRight(total[from - 1], amount);

  for (i = 0; i < amount; i++) {
    total[from - 1].pop();
  }

  total[to - 1] = concat(total[to - 1], x);
//   console.log(total);
});

const xy = total.map((l) => takeRight(l, 1)).join("");
console.log(xy); //JNRSCDWPP
