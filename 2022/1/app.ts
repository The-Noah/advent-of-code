const input = await Deno.readTextFile("input.txt");

const elves = input.split("\n\n").map((e) => e.split("\n").map(Number));
const sums = elves.map((elf) => elf.reduce((acc, value) => acc + value, 0));

const highest = sums.sort((a, b) => b - a)[0];

console.log("Part 1:", highest);

const second = sums.sort((a, b) => b - a)[1];
const third = sums.sort((a, b) => b - a)[2];

console.log("Part 2:", highest + second + third);
