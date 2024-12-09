use aoc2024::aoc;

aoc!(
  {
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
  },
  1970720,
  17191599
);
