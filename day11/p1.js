const fs = require("fs");
const { toNumber, fill, chain } = require("lodash");

const input = fs.readFileSync("sample.txt", "utf8");

const monkeys = input.split("\n\n").map((monkey) => {
  const [l1, l2, l3, l4, l5, l6] = monkey.split("\n");
  const number = toNumber(l1.split(" ")[1].replace(":", ""));
  const items = l2.split(":")[1].split(",").map(toNumber);
  const divisible = toNumber(l4.split(" ")[5]);
  const trueTo = toNumber(l5.split(" ")[9]);
  const falseTo = toNumber(l6.split(" ")[9]);
  const operation = function (old) {
    const expression = l3.split("=")[1];
    return eval(expression);
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

const counter = fill(Array(monkeys.length), 0);
for (round = 1; round <= 20; round++) {
  for (monkeyIndex = 0; monkeyIndex < monkeys.length; monkeyIndex++) {
    const monkey = monkeys[monkeyIndex];
    const items = monkey.items;
    for (itemIndex = 0; itemIndex < items.length; itemIndex++) {
      counter[monkeyIndex] = counter[monkeyIndex] + 1;
      items[itemIndex] = monkey.operation(items[itemIndex]);
      items[itemIndex] = Math.floor(items[itemIndex] / 3);

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

console.log(maxs[0] * maxs[1]); //66802
