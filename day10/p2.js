const { assert } = require("console");
const fs = require("fs");
const { toNumber, chunk } = require("lodash");

const input = fs.readFileSync("input.txt", "utf8");

let cycle = 0;
let x = 1;
let image = "";

function draw() {
  const crt = cycle % 40;
  const spriteMin = x - 1;
  const spriteMax = x + 1;

  if (crt >= spriteMin && crt <= spriteMax) {
    image = image + "#";
  } else {
    image = image + ".";
  }
}

input.split("\n").forEach((line) => {
  if (line == "noop") {
    draw();
    cycle = cycle + 1;
  } else {
    const operand = toNumber(line.split(" ")[1]);

    draw();
    cycle = cycle + 1;

    draw();
    x = x + operand;
    cycle = cycle + 1;
  }
});

output = chunk(image.split(""), 40)
  .map((line) => line.join(""))
  .join("\n");

assert(
  output ==
    "###..#....#..#.#....#..#.###..####.#..#.\n#..#.#....#..#.#....#.#..#..#....#.#..#.\n#..#.#....#..#.#....##...###....#..####.\n###..#....#..#.#....#.#..#..#..#...#..#.\n#....#....#..#.#....#.#..#..#.#....#..#.\n#....####..##..####.#..#.###..####.#..#."
);
