use aoc2024::AdventOfCode;

pub struct Day1;

impl AdventOfCode for Day1 {
  fn run() -> (i32, i32) {
    let input = include_str!("../../input/day1.txt").trim();

    let mut left = vec![];
    let mut right = vec![];

    for line in input.lines().collect::<Vec<&str>>() {
      let parts = line
        .split_whitespace()
        .collect::<Vec<&str>>()
        .iter_mut()
        .map(|s| s.trim())
        .map(|s| s.parse::<i32>().unwrap())
        .collect::<Vec<i32>>();

      left.push(parts[0]);
      right.push(parts[1]);
    }

    left.sort();
    right.sort();

    let mut part1 = 0;
    for (i, _) in left.iter().enumerate() {
      part1 += (left[i] - right[i]).abs();
    }

    let mut part2 = 0;
    for left_num in left {
      let occurences = right.iter().filter(|&n| *n == left_num).count() as i32;
      part2 += left_num * occurences;
    }

    (part1, part2)
  }
}

fn main() {
  let result = Day1::run();
  println!("{}\n{}", result.0, result.1);
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn part1() {
    let result = Day1::run().0;
    assert_eq!(result, 1970720);
  }

  #[test]
  fn part2() {
    let result = Day1::run().1;
    assert_eq!(result, 17191599);
  }
}
