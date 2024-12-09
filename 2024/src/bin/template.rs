use std::{
  env::args,
  fs::{self, exists},
};

fn main() {
  let day = args().nth(1).expect("you must specify a day").parse::<u8>().expect("day must be a u8");

  assert!(day <= 25);

  let path = format!("src/bin/day{}.rs", day);

  if !exists(&path).is_ok_and(|t| !t) {
    panic!("can not overwrite existing file");
  }

  fs::write(
    path,
    format!(
      "use aoc2024::aoc;

aoc!({{
    let input = include_str!(\"../../input/day{day}.txt\").trim();

    let mut part1 = 0;
    let mut part2 = 0;
    for line in input.lines().collect::<Vec<&str>>() {{

    }}

    (part1, part2)
  }},
  0,
  0
);",
    ),
  )
  .expect("failed to save file");

  fs::write(format!("input/day{}.txt", day), "").expect("failed to save input");
}
