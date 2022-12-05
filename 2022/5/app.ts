const input = await Deno.readTextFile("input.txt");

const parsedInput = input.split("\n").filter(Boolean);

const stacks: string[][] = [];
const stacks2: string[][] = [];

let runningActions = false;
for (const line of parsedInput) {
  // find separation between container stacks and actions
  if (line.startsWith(" 1 ")) {
    runningActions = true;
    continue;
  }

  if (!runningActions) {
    const containers = line
      .split(/(\[[A-Z]\] ?| {3} ?)/g)
      .filter(Boolean)
      .map((value) => value.trim());

    for (const i in containers) {
      const container = containers[i];

      if (!container) {
        continue;
      } else if (!stacks[i]) {
        stacks[i] = [];
        stacks2[i] = [];
      }

      stacks[i].unshift(container.charAt(1));
      stacks2[i].unshift(container.charAt(1));
    }

    continue;
  }

  const parts = line.split(" ");
  if (parts[0] !== "move" || parts[2] !== "from" || parts[4] !== "to") {
    continue;
  }

  const amount = +parts[1];
  const from = +parts[3] - 1;
  const to = +parts[5] - 1;

  // part 1
  for (let i = 0; i < amount; i++) {
    const container = stacks[from].pop() as string;
    stacks[to].push(container);
  }

  // part 2
  const containers = stacks2[from].splice(stacks2[from].length - amount, amount);
  stacks2[to].push(...containers);
}

console.log("Part 1:", stacks.map((stack) => stack[stack.length - 1]).join(""));
console.log("Part 2:", stacks2.map((stack) => stack[stack.length - 1]).join(""));
