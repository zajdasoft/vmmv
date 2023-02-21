import type { PathContext } from "./PathContext";

export interface IRoutingAdapter<TQueryParams> {
  init(navigate: (nodes: string[], params: TQueryParams, path: string) => void): () => void;
  joinPathWithQueryParams(path: string[], params: TQueryParams): string;
  wrapLinkPath(path: string): string;
  parseDestination(path: string, context: PathContext): string[] | undefined;

  onBeforeNavigate(path: string[], params: TQueryParams): boolean;
  onAfterNavigate(finalLocation: string): void;
}
