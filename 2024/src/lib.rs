pub trait AdventOfCode {
  fn run() -> (i32, i32);
}

#[macro_export]
macro_rules! aoc_main {
  ($t:ty) => {
    fn main() {
      let result = <$t>::run();
      println!("{}\n{}", result.0, result.1);
    }
  };
}

#[macro_export]
macro_rules! aoc_test {
  ($t:ty, $p1:expr, $p2:expr) => {
    #[cfg(test)]
    mod tests {
      use super::*;

      #[test]
      fn part1() {
        let result = <$t>::run().0;
        assert_eq!(result, $p1);
      }

      #[test]
      fn part2() {
        let result = <$t>::run().1;
        assert_eq!(result, $p2);
      }
    }
  };
}
