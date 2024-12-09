use aoc2024::AdventOfCode;

pub struct Day2;

impl AdventOfCode for Day2 {
  fn run() -> (i32, i32) {
    let input = include_str!("../../input/day2.txt").trim();

    let mut part1 = 0;
    let mut part2 = 0;
    for line in input.lines().collect::<Vec<&str>>() {
      let levels = line
        .split_whitespace()
        .collect::<Vec<&str>>()
        .iter_mut()
        .map(|s| s.trim())
        .map(|s| s.parse::<i32>().unwrap())
        .collect::<Vec<i32>>();

      if check_levels(&levels) {
        part1 += 1;
        part2 += 1;
        continue;
      }

      for i in 0..levels.len() {
        let mut new_levels = levels.clone();
        new_levels.remove(i);

        if check_levels(&new_levels) {
          part2 += 1;
          break;
        }
      }
    }

    (part1, part2)
  }
}

/// Return if the levels are safe
fn check_levels(levels: &[i32]) -> bool {
  (levels[0] < levels[1] && levels.windows(2).all(|w| w[0] < w[1] && w[0] >= w[1] - 3)) || (levels[0] > levels[1] && levels.windows(2).all(|w| w[0] > w[1] && w[1] >= w[0] - 3))
}

fn main() {
  let result = Day2::run();
  println!("{}\n{}", result.0, result.1);
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn part1() {
    let result = Day2::run().0;
    assert_eq!(result, 670);
  }

  #[test]
  fn part2() {
    let result = Day2::run().1;
    assert_eq!(result, 700);
  }
}
