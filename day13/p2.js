const fs = require("fs");
const { head, tail } = require("lodash");

const input = fs.readFileSync("input.txt", "utf8");

const packs = input.replaceAll("\n\n", "\n").split("\n").map(eval);
packs.push([[2]]);
packs.push([[6]]);

function isRightOrder([list_a, list_b]) {
  if (list_a.length == 0 && list_b.length == 0) {
    return null;
  }
  if (list_a.length == 0 && list_b.length > 0) {
    return true;
  }
  if (list_a.length > 0 && list_b.length == 0) {
    return false;
  }

  a_head = head(list_a);
  b_head = head(list_b);

  if (typeof a_head == "number" && typeof b_head == "number") {
    if (a_head > b_head) return false;
    if (a_head < b_head) return true;
    else return isRightOrder([tail(list_a), tail(list_b)]);
  }
  if (typeof a_head != "number" && typeof b_head != "number") {
    head_compare = isRightOrder([a_head, b_head]);
    if (head_compare != null) return head_compare;
    else return isRightOrder([tail(list_a), tail(list_b)]);
  }
  if (typeof a_head != "number" && typeof b_head == "number") {
    head_compare = isRightOrder([a_head, [b_head]]);
    if (head_compare != null) return head_compare;
    else return isRightOrder([tail(list_a), tail(list_b)]);
  }
  if (typeof a_head == "number" && typeof b_head != "number") {
    head_compare = isRightOrder([[a_head], b_head]);
    if (head_compare != null) return head_compare;
    else return isRightOrder([tail(list_a), tail(list_b)]);
  }
  console.log("FUCK");
  return "Fuck";
}

result = packs
  .sort((a, b) => {
    return isRightOrder([a, b]) ? -1 : 0;
  })
  .map((e) => JSON.stringify(e));

answer = (result.indexOf("[[2]]") + 1) * (result.indexOf("[[6]]") + 1);

console.log(answer);
