const input = await Deno.readTextFile("input.txt");

const trees: number[][] = [];

for (const line of input.split("\n").filter(Boolean)) {
  trees.push(line.split("").map(Number));
}

let visible = 0;
for (let y = 1; y < trees.length - 1; y++) {
  for (let x = 1; x < trees[0].length - 1; x++) {
    const tree = trees[y][x];

    let treeIsVisible = false;
    for (let y2 = 0; y2 < y; y2++) {
      treeIsVisible = trees[y2][x] < tree;

      if (!treeIsVisible) {
        break;
      }
    }

    if (treeIsVisible) {
      visible++;
      continue;
    }

    treeIsVisible = false;
    for (let y2 = y + 1; y2 < trees.length; y2++) {
      treeIsVisible = trees[y2][x] < tree;

      if (!treeIsVisible) {
        break;
      }
    }

    if (treeIsVisible) {
      visible++;
      continue;
    }

    treeIsVisible = false;
    for (let x2 = 0; x2 < x; x2++) {
      treeIsVisible = trees[y][x2] < tree;

      if (!treeIsVisible) {
        break;
      }
    }

    if (treeIsVisible) {
      visible++;
      continue;
    }

    treeIsVisible = false;
    for (let x2 = x + 1; x2 < trees[0].length; x2++) {
      treeIsVisible = trees[y][x2] < tree;

      if (!treeIsVisible) {
        break;
      }
    }

    if (treeIsVisible) {
      visible++;
      continue;
    }
  }
}

visible += trees.length * 2 + trees[0].length * 2 - 4; // add in the edges

console.log("Part 1:", visible);

const viewingScores: number[] = [];
for (let y = 0; y < trees.length; y++) {
  for (let x = 0; x < trees[0].length; x++) {
    const tree = trees[y][x];

    let visibleTrees = 0;
    for (let y2 = y - 1; y2 >= 0; y2--) {
      visibleTrees++;

      if (trees[y2][x] >= tree) {
        break;
      }
    }

    const i = viewingScores.push(visibleTrees) - 1;

    visibleTrees = 0;
    for (let y2 = y + 1; y2 < trees.length; y2++) {
      visibleTrees++;

      if (trees[y2][x] >= tree) {
        break;
      }
    }

    viewingScores[i] *= visibleTrees;

    visibleTrees = 0;
    for (let x2 = x - 1; x2 >= 0; x2--) {
      visibleTrees++;

      if (trees[y][x2] >= tree) {
        break;
      }
    }

    viewingScores[i] *= visibleTrees;

    visibleTrees = 0;
    for (let x2 = x + 1; x2 < trees[0].length; x2++) {
      visibleTrees++;

      if (trees[y][x2] >= tree) {
        break;
      }
    }

    viewingScores[i] *= visibleTrees;
  }
}

console.log("Part 2:", viewingScores.sort((a, b) => b - a)[0]);
