const input = await Deno.readTextFile("input.txt");

const data = input.trim().split("");

let buffer: string[] = [];
let part1Finished = false;
let buffer2: string[] = [];

for (const i in data) {
  if (buffer.length === 4) {
    buffer.shift();
  }

  if (buffer2.length === 14) {
    buffer2.shift();
  }

  buffer.push(data[i]);
  buffer2.push(data[i]);

  if (buffer.length < 4) {
    continue;
  }

  let unique = new Set(buffer);
  if (Array.from(unique).join() === buffer.join() && !part1Finished) {
    console.log("Part 1:", +i + 1);
    part1Finished = true;
  }

  if (buffer2.length < 14) {
    continue;
  }

  unique = new Set(buffer2);
  if (Array.from(unique).join() === buffer2.join()) {
    console.log("Part 2:", +i + 1);
    break;
  }
}
