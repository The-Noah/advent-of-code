const input = await Deno.readTextFile("input.txt");

type OpponentChoice = "A" | "B" | "C";
type DefendentChoice = "X" | "Y" | "Z";

const CHOICE_SCORES: Record<DefendentChoice, number> = {
  X: 1,
  Y: 2,
  Z: 3
};

const rounds = input
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split(" ")) as [OpponentChoice, DefendentChoice][];

let totalScore = 0;
for(const round of rounds){
  totalScore += getRoundScore(round[0], round[1]);
}

console.log("Part 1:", totalScore);

let totalScore2 = 0;
for (const round of rounds) {
  totalScore2 += getRoundScore(round[0], getRoundChoice(round[0], round[1]));
}

console.log("Part 2:", totalScore2);

function getRoundScore(opponent: OpponentChoice, defendent: DefendentChoice){
  let score = CHOICE_SCORES[defendent];

  if (opponent === "A" && defendent === "X") {
    score += 3;
  } else if (opponent === "A" && defendent === "Y") {
    score += 6;
  } else if (opponent === "A" && defendent === "Z") {
    score += 0;
  } else if (opponent === "B" && defendent === "X") {
    score += 0;
  } else if (opponent === "B" && defendent === "Y") {
    score += 3;
  } else if (opponent === "B" && defendent === "Z") {
    score += 6;
  } else if (opponent === "C" && defendent === "X") {
    score += 6;
  } else if (opponent === "C" && defendent === "Y") {
    score += 0;
  } else if (opponent === "C" && defendent === "Z") {
    score += 3;
  }

  return score;
}

function getRoundChoice(opponent: OpponentChoice, defendent: DefendentChoice): DefendentChoice {
  if (opponent === "A" && defendent === "X") {
    return "Z";
  } else if (opponent === "A" && defendent === "Y") {
    return "X";
  } else if (opponent === "A" && defendent === "Z") {
    return "Y";
  } else if (opponent === "B" && defendent === "X") {
    return "X";
  } else if (opponent === "B" && defendent === "Y") {
    return "Y";
  } else if (opponent === "B" && defendent === "Z") {
    return "Z";
  } else if (opponent === "C" && defendent === "X") {
    return "Y";
  } else if (opponent === "C" && defendent === "Y") {
    return "Z";
  } else if (opponent === "C" && defendent === "Z") {
    return "X";
  }
}
