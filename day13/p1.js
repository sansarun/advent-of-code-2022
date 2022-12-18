const fs = require("fs");
const { head, tail, sum, compact } = require("lodash");

const input = fs.readFileSync("input.txt", "utf8");

const pairs = input.split("\n\n").map((line) => line.split("\n").map(eval));

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

result = pairs.map((pair, index) => (isRightOrder(pair) ? index + 1 : 0));
console.log(sum(compact(result))); //6415
