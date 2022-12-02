const _ = require("lodash");
const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

function resultScore(opponent, me) {
  if (me == "X" && opponent == "C") return 6;
  if (me == "Y" && opponent == "A") return 6;
  if (me == "Z" && opponent == "B") return 6;

  if (me == "X" && opponent == "A") return 3;
  if (me == "Y" && opponent == "B") return 3;
  if (me == "Z" && opponent == "C") return 3;

  return 0;
}

function calculateScore(opponent, me) {
  shapeScore = {
    X: 1,
    Y: 2,
    Z: 3,
  };
  return shapeScore[me] + resultScore(opponent, me);
}

rounds = input.split("\n");
scores = rounds.map((round) => {
  const [opponent, me] = round.split(" ");
  return calculateScore(opponent, me);
});

console.log(_.sum(scores)); //10404