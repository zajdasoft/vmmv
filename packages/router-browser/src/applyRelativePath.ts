export function applyRelativePath(absolute: string[], relative: string[]): string[] {
  // When the relative path starts with / it means it is not relative, but absolute.
  if (!relative[0]) return relative;
  const copy = [...absolute];

  for (const node of relative) {
    switch (node) {
      case ".":
      case "":
        break;

      case "..":
        copy.pop();
        break;

      default:
        copy.push(node);
        break;
    }
  }

  return copy;
}
