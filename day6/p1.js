const fs = require("fs");
const { uniq } = require("lodash");

const input = fs.readFileSync("input.txt", "utf8");

function xxx(t) {
  for (i = 3; i < t.length; i++) {
    text = t.substring(i - 3, i + 1);
    if (uniq(text.split("")).length == 4) {
      return i + 1;
    }
  }
}

console.log(xxx(input)); //1850
