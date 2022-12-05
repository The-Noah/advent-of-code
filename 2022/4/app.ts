const input = await Deno.readTextFile("input.txt");

const pairs = input
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split(",").map((range) => range.split("-").map(Number)));

let result = 0;
for (const pair of pairs) {
  if ((pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1]) || (pair[1][0] <= pair[0][0] && pair[1][1] >= pair[0][1])) {
    result++;
  }
}

console.log("Part 1:", result);

let result2 = 0;
for (const pair of pairs) {
  if (
    (pair[0][0] >= pair[1][0] && pair[0][0] <= pair[1][1]) ||
    (pair[0][1] >= pair[1][0] && pair[0][1] <= pair[1][1]) ||
    (pair[1][0] >= pair[0][0] && pair[1][0] <= pair[0][1]) ||
    (pair[1][1] >= pair[0][0] && pair[1][1] <= pair[0][1])
  ) {
    result2++;
  }
}

console.log("Part 2:", result2);
