const input = await Deno.readTextFile("input.txt");

const terminalOutput = input.split("\n").filter(Boolean);

interface IFile {
  name: string;
  size: number;
}

interface IDir {
  name: string;
  children: (IFile | IDir)[];
}

const SYSTEM_SPACE = 70000000;
const SPACE_REQUIRED = 30000000;

const filesystem: IDir = {
  name: "/",
  children: [],
};
let workingDirectory = "/";

for (const line of terminalOutput) {
  if (line.startsWith("$ ")) {
    const args = line.slice(2).split(" ");
    processCommand(args[0], args.slice(1));
    continue;
  }

  const [dirOrSize, name] = line.split(" ");

  if (dirOrSize === "dir") {
    getCurrentDirectory()?.children.push({
      name,
      children: [],
    });
  } else {
    getCurrentDirectory()?.children.push({
      name,
      size: +dirOrSize,
    });
  }
}

console.log(
  "Part 1:",
  getLargeDirectories().reduce((acc, dir) => acc + getDirectorySize(dir), 0)
);

console.log("Part 2:", getDirectorySize(findSmallestDirectoryThatWhenDeletedWouldFreeUpEnoughSpace()));

function processCommand(command: string, args: string[]) {
  if (command === "cd") {
    if (args[0] === "..") {
      const parts = workingDirectory.split("/");
      parts.pop();
      parts.pop();

      workingDirectory = parts.join("/") + "/";

      if (workingDirectory === "") {
        workingDirectory = "/";
      }
    } else if (args[0] === "/") {
      workingDirectory = "/";
    } else {
      workingDirectory += `${args[0].toString()}/`;
    }
  }
}

function getCurrentDirectory(): IDir | undefined {
  return _getCurrentDirectory(filesystem, "/");
}

function _getCurrentDirectory(directory: IDir, currentPath: string): IDir | undefined {
  if (workingDirectory === "/") {
    return filesystem;
  }

  for (const child of directory.children) {
    if ("size" in child) {
      continue;
    }

    if (workingDirectory === currentPath + child.name + "/") {
      return child;
    }

    const found = _getCurrentDirectory(child, currentPath + child.name + "/");
    if (found) {
      return found;
    }
  }
}

function getLargeDirectories(): IDir[] {
  const directories: IDir[] = [];

  const traverseTree = (directory: IDir) => {
    const size = getDirectorySize(directory);

    if (size < 100000) {
      directories.push(directory);
    }

    for (const child of directory.children) {
      if ("children" in child) {
        traverseTree(child);
      }
    }
  };

  traverseTree(filesystem);

  return directories;
}

function getDirectorySize(directory: IDir): number {
  return directory.children.reduce((acc, child) => {
    if ("size" in child) {
      return acc + child.size;
    }

    return acc + getDirectorySize(child);
  }, 0);
}

function findSmallestDirectoryThatWhenDeletedWouldFreeUpEnoughSpace(): IDir {
  const directories: IDir[] = [];
  const freeSpace = SYSTEM_SPACE - getDirectorySize(filesystem);

  const traverseTree = (directory: IDir) => {
    const size = getDirectorySize(directory);

    if (freeSpace + size >= SPACE_REQUIRED) {
      directories.push(directory);
    }

    for (const child of directory.children) {
      if ("children" in child) {
        traverseTree(child);
      }
    }
  };

  traverseTree(filesystem);

  return directories.sort((a, b) => getDirectorySize(a) - getDirectorySize(b))[0];
}
