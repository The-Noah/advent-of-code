// alternative solution using only 1 line of code

(await Deno.readTextFile("input.txt")).split("\n\n").map((e) => e.split("\n").map(Number)).map((elf) => elf.reduce((acc, value) => acc + value, 0)).sort((a, b) => b - a).reduce((_, value, i, arr) => (i === 0 ? console.log("Part 1:", value) : i === 1 ? console.log("Part 2:", arr[0] + arr[1] + arr[2]) : undefined), undefined);
