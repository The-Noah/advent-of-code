use aoc2024::aoc;

aoc!(
  {
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
  },
  156388521,
  75920122
);
