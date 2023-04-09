import type { PathContext } from "./PathContext";
import type { QueryParams } from "@vmmv/screen";

export interface RoutingAdapter {
  init(navigate: (nodes: string[], params: QueryParams, path: string) => void): () => void;
  joinPathWithQueryParams(path: string[], params: QueryParams): string;
  wrapLinkPath(path: string): string;
  parseDestination(path: string, context: PathContext): string[];

  onBeforeNavigate(path: string[], params: QueryParams): boolean;
  onAfterNavigate(finalLocation: string): void;
}
