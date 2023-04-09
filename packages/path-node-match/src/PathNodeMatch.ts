import type { PathToken } from "./PathParameterParser";
import PathParameterParser, { PathTokenType } from "./PathParameterParser";
import type { PathParams, ScreenMatchResult } from "@vmmv/screen";

const parser = new PathParameterParser();

function next<T>(items: T[], index: number): T | undefined {
  if (items.length >= index) return undefined;
  return items[index + 1];
}

function buildRegex(tokens: PathToken[]) {
  let regex = "";

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    switch (token.type) {
      case PathTokenType.literal:
        regex += token.value;
        break;

      case PathTokenType.variable:
        const nextToken = next(tokens, i);
        let constraint = "[A-Za-z0-9]+";

        if (nextToken?.type === PathTokenType.constraint) {
          constraint = nextToken.value;
          i++;
        }

        regex += `(?<${token.value}>${constraint})`;
        break;

      case PathTokenType.constraint:
        throw Error("Unexpected constraint token.");
    }
  }

  return new RegExp("^" + regex + "$");
}

export default class PathNodeMatch {
  private readonly tokens: PathToken[];
  private readonly regex: RegExp;

  constructor(public readonly pathname: string) {
    this.tokens = parser.parse(pathname);
    this.regex = buildRegex(this.tokens);
  }

  match(pathname: string): ScreenMatchResult {
    const result = this.regex.exec(pathname);
    if (!result) return undefined;
    return result.groups;
  }

  build(params: PathParams) {
    let pathname = "";
    for (let i = 0; i < this.tokens.length; i++) {
      const token = this.tokens[i];
      switch (token.type) {
        case PathTokenType.literal:
          pathname += token.value;
          break;

        case PathTokenType.variable:
          const name = token.value;
          if (!(name in params)) throw Error(`Unable to find path parameter: ${token.value}`);
          pathname += params[name];
          break;

        case PathTokenType.constraint:
          break;
      }
    }

    if (!this.regex.test(pathname)) {
      throw Error(`The path node value '${pathname}' doesn't match the path node criteria ${this.regex}`);
    }

    return pathname;
  }
}
