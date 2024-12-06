fn main() {
  let input = include_str!("../input.txt").trim();

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

  println!("Part 1: {}", part1);
  println!("Part 2: {}", part2);
}

/// Return if the levels are safe
fn check_levels(levels: &Vec<i32>) -> bool {
  if levels[0] < levels[1] {
    if levels.windows(2).all(|w| w[0] < w[1] && w[0] >= w[1] - 3) {
      return true;
    }
  } else if levels[0] > levels[1] {
    if levels.windows(2).all(|w| w[0] > w[1] && w[1] >= w[0] - 3) {
      return true;
    }
  }

  false
}
