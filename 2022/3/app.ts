const input = await Deno.readTextFile("input.txt");

const rucksacks = input
  .split("\n")
  .filter(Boolean)
  .map((stack) => {
    const items = stack.split("");
    // split the items into 2 equal halves
    return [items.slice(0, items.length / 2), items.slice(items.length / 2)] as unknown as [string[], string[]];
  });

const duplicates = rucksacks.map((stack) => stack[0].find((item) => stack[1].includes(item)));
console.log(
  "Part 1:",
  duplicates.reduce((acc, value) => acc + getPriority(value), 0)
);

const groupsInput = input.split("\n").filter(Boolean);
const groups: [string[], string[], string[]][] = [];
for (let i = 0; i < groupsInput.length; i += 3) {
  groups.push([groupsInput[i].split(""), groupsInput[i + 1].split(""), groupsInput[i + 2].split("")]);
}

const duplicateItemsInGroups = groups.map((group) => group[0].find((item) => group[1].includes(item) && group[2].includes(item)));
console.log(
  "Part 2:",
  duplicateItemsInGroups.reduce((acc, value) => acc + getPriority(value), 0)
);

function getPriority(character: string) {
  const value = character.codePointAt(0) as number;

  // lowercase letters
  if (value >= 97) {
    return value - 96;
  }

  // uppercase letters
  return value - 38;
}
