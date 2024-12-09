pub trait AdventOfCode {
  fn run() -> (i32, i32);
}

#[macro_export]
macro_rules! aoc {
  ($r:stmt, $p1:expr, $p2:expr) => {
    use aoc2024::AdventOfCode;

    struct Day;

    impl AdventOfCode for Day {
      fn run() -> (i32, i32) {
        $r
      }
    }

    fn main() {
      let result = Day::run();
      println!("{}\n{}", result.0, result.1);
    }

    #[cfg(test)]
    mod tests {
      use super::*;

      #[test]
      fn part1() {
        let result = Day::run().0;
        assert_eq!(result, $p1);
      }

      #[test]
      fn part2() {
        let result = Day::run().1;
        assert_eq!(result, $p2);
      }
    }
  };
}
