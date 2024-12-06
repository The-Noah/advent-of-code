fn main() {
  let input = include_str!("../input.txt").trim();

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

  let mut sum = 0;
  for (i, _) in left.iter().enumerate() {
    sum += (left[i] - right[i]).abs();
  }

  println!("Part 1: {}", sum);

  let mut sum = 0;
  for left_num in left {
    let occurences = right.iter().filter(|&n| *n == left_num).count() as i32;
    sum += left_num * occurences;
  }

  println!("Part 2: {}", sum);
}
