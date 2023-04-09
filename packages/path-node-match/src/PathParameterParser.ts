export enum PathTokenType {
  literal = "literal",
  variable = "variable",
  constraint = "constant",
}

export type PathToken = {
  value: string;
  type: PathTokenType;
}

export default class PathParameterParser {
  private pathname = "";
  private index = 0;
  private token = "";
  private state = PathTokenType.literal;
  private tokens: PathToken[] = [];

  private reset() {
    this.index = 0;
    this.token = "";
    this.state = PathTokenType.literal;
    this.tokens = [];
  }

  private storeToken(type = this.state) {
    this.tokens.push({
      value: this.token,
      type,
    });

    this.token = "";
  }

  parse(pathname: string) {
    this.reset();
    this.pathname = pathname;

    for (; this.index < pathname.length; this.index++) {
      const char = pathname.charAt(this.index);

      switch (this.state) {
        case PathTokenType.literal:
          this.parseLiteral(char);
          break;

        case PathTokenType.variable:
          this.parseVariableName(char);
          break;

        case PathTokenType.constraint:
          this.parseVariableConstraint(char);
          break;
      }
    }

    if (this.state !== PathTokenType.literal) {
      this.throwParseError("Unexpected end of a path node. Variables must be terminated")
    }

    if (this.token) {
      this.storeToken();
    }

    return this.tokens;
  }

  private parseLiteral(char: string) {
    switch (char) {
      case "/":
        if (this.token) this.storeToken();
        this.state = PathTokenType.variable;
        break;

      default:
        this.token += char;
    }
  }

  private parseVariableName(char: string) {
    switch (char) {
      case ":":
        if (!this.token) this.throwParseError("Expected variable name before ':'");
        this.storeToken();
        this.state = PathTokenType.constraint;
        break;

      case "/":
        if (!this.token) this.throwParseError("Expected variable name before '/'");
        this.storeToken();
        this.state = PathTokenType.literal;
        break;

      default:
        this.token += char;
    }
  }

  private parseVariableConstraint(char: string) {
    switch (char) {
      case "/":
        if (!this.token) this.throwParseError("Expected variable constraint before '/'");
        this.storeToken();
        this.state = PathTokenType.literal;
        break;

      default:
        this.token += char;
    }
  }

  private throwParseError(message: string) {
    throw Error(`Path parse error: ${message} at index: ${this.index} of path: '${this.pathname}'.`);
  }
}
