import { PathNodeMatch } from "@vmmv/path-node-match";

export const createDefaultMatchNavigation = (screenDescriptivePathnameProvider: () => string) => (pathname: string) => {
  const match = new PathNodeMatch(screenDescriptivePathnameProvider());
  return match.match(pathname);
}
