const _ = require("lodash");
const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

function resultScore(result) {
  const scores = {
    X: 0,
    Y: 3,
    Z: 6,
  };
  return scores[result];
}

function myShape(opponent, result) {
  if (result == "Y") {
    return {
      A: "X",
      B: "Y",
      C: "Z",
    }[opponent];
  } else if (result == "X") {
    return {
      A: "Z",
      B: "X",
      C: "Y",
    }[opponent];
  } else {
    return {
      A: "Y",
      B: "Z",
      C: "X",
    }[opponent];
  }
}

function calculateScore(opponent, result) {
  shapeScore = {
    X: 1,
    Y: 2,
    Z: 3,
  };
  return shapeScore[myShape(opponent, result)] + resultScore(result);
}

rounds = input.split("\n");
scores = rounds.map((round) => {
  const [opponent, me] = round.split(" ");
  return calculateScore(opponent, me);
});

console.log(_.sum(scores)); //10334
