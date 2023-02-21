import { PathNodeMatch } from "@vmmv/path-node-match";

export const createDefaultMatchNavigation = (screenDescriptivePathNodeProvider: () => string) => (pathNode: string) => {
  const match = new PathNodeMatch(screenDescriptivePathNodeProvider());
  return match.match(pathNode);
}
