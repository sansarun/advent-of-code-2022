const fs = require("fs");
const { toNumber, fill, chain } = require("lodash");

const input = fs.readFileSync("input.txt", "utf8");

const monkeys = input.split("\n\n").map((monkey) => {
  const [l1, l2, l3, l4, l5, l6] = monkey.split("\n");
  const number = BigInt(toNumber(l1.split(" ")[1].replace(":", "")));
  const items = l2
    .split(":")[1]
    .split(",")
    .map((n) => BigInt(toNumber(n)));
  const divisible = BigInt(toNumber(l4.split(" ")[5]));
  const trueTo = toNumber(l5.split(" ")[9]);
  const falseTo = toNumber(l6.split(" ")[9]);
  const operation = function (old) {
    const [, a, operation, b] = l3.split("=")[1].split(" ");
    aa = a == "old" ? old : BigInt(a);
    bb = b == "old" ? old : BigInt(b);
    if (operation == "+") return aa + bb;
    else return aa * bb;
  };
  return {
    number: number,
    items: items,
    divisible: divisible,
    trueTo: trueTo,
    falseTo: falseTo,
    operation: operation,
  };
});

big_mod = 1n;
monkeys.forEach((monkey) => {
  big_mod = big_mod * monkey.divisible;
});

const counter = fill(Array(monkeys.length), 0);
for (round = 1; round <= 10000; round++) {
  for (monkeyIndex = 0; monkeyIndex < monkeys.length; monkeyIndex++) {
    const monkey = monkeys[monkeyIndex];
    const items = monkey.items;
    for (itemIndex = 0; itemIndex < items.length; itemIndex++) {
      counter[monkeyIndex] = counter[monkeyIndex] + 1;
      items[itemIndex] = monkey.operation(items[itemIndex]) % big_mod;

      const throwTo =
        items[itemIndex] % monkey.divisible == 0
          ? monkey.trueTo
          : monkey.falseTo;

      monkeys[throwTo].items.push(items[itemIndex]);
      items[itemIndex] = -1;
    }
    monkey.items = monkey.items.filter((i) => i !== -1);
  }
}

const maxs = chain(counter)
  .sort((a, b) => a - b)
  .takeRight(2)
  .value();

console.log(maxs[0] * maxs[1]); //21800916620
