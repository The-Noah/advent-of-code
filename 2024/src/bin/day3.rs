use aoc2024::AdventOfCode;

pub struct Day3;

impl AdventOfCode for Day3 {
  fn run() -> (i32, i32) {
    let input = include_str!("../../input/day3.txt").trim();

    let mut part1 = 0;
    let mut part2 = 0;

    let mut enabled = true;

    for line in input.lines().collect::<Vec<&str>>() {
      let mut in_mul = false;
      let mut x: Option<i32> = None;

      let mut buffer = String::new();

      for char in line.chars() {
        buffer.push(char);

        if in_mul {
          if char == ',' && x.is_none() {
            if let Ok(value) = buffer[..buffer.len() - 1].parse() {
              x = Some(value);
            } else {
              in_mul = false;
            }

            buffer = String::new();
          } else if char == ')' {
            let y: i32 = if let Ok(value) = buffer[..buffer.len() - 1].parse() {
              value
            } else {
              in_mul = false;
              continue;
            };

            if let Some(x) = x {
              part1 += x * y;

              if enabled {
                part2 += x * y;
              }
            } else {
              unreachable!();
            }

            in_mul = false;
          } else if !char.is_ascii_digit() {
            in_mul = false;
          }
        } else if buffer.ends_with("mul(") {
          in_mul = true;
          x = None;
          buffer = String::new();
        } else if buffer.ends_with("do()") {
          enabled = true;
        } else if buffer.ends_with("don't()") {
          enabled = false;
        }
      }
    }

    (part1, part2)
  }
}

fn main() {
  let result = Day3::run();
  println!("{}\n{}", result.0, result.1);
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn part1() {
    let result = Day3::run().0;
    assert_eq!(result, 156388521);
  }

  #[test]
  fn part2() {
    let result = Day3::run().1;
    assert_eq!(result, 75920122);
  }
}
