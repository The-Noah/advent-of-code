const input = await Deno.readTextFile("input.txt");

const elves = input.split("\n\n").map((e) => e.split("\n").map(Number));
const sums = elves.map((elf) => elf.reduce((acc, value) => acc + value, 0));
const sorted = sums.sort((a, b) => b - a);

console.log("Part 1:", sorted[0]);
console.log(
  "Part 2:",
  sorted.slice(0, 3).reduce((acc, value) => acc + value, 0)
);
