import type {
  ScreenNavigationContext,
  NavigationErrorScreen,
  ScreenDescriptor,
  Navigator,
  PathParams,
  QueryParams,
  ScreenSearchResult
} from "@vmmv/screen";
import {
  getScreenRoutingNavigationContext,
  getSearchedParams,
  getSearchedScreen,
  isNavigationErrorScreen
} from "@vmmv/screen";
import type { PathContext } from "./PathContext";
import type { Middleware, MiddlewareParams } from "./Middleware";
import type { RoutingAdapter } from "./RoutingAdapter";
import type { RouteNavigationItem } from "./RouteNavigationItem";

type ErrorScreenResult = [RouteNavigationItem[], NavigationErrorScreen];

export default class Router {
  private readonly middlewares: Middleware[] = [];
  maxRedirectCount = 20;
  private finalLocation = "/";
  private redirectCounter = 0;

  constructor(
    private readonly root: NavigationErrorScreen,
    private readonly adapter: RoutingAdapter) {}

  getPathLocation(path: string, queryParams: QueryParams, context: PathContext): string {
    const absolute = this.adapter.parseDestination(path, context);
    return this.adapter.joinPathWithQueryParams(absolute, queryParams);
  }

  navigate(path: string, queryParams: QueryParams, context: PathContext): void {
    if (this.redirectCounter >= this.maxRedirectCount) {
      throw new Error("Navigation loop counter exceeded.");
    }

    const absolute = this.adapter.parseDestination(path, context);
    if (!this.adapter.onBeforeNavigate(absolute, queryParams)) {
      return;
    }

    this.finalLocation = this.adapter.joinPathWithQueryParams(absolute, queryParams);
    this.redirectCounter++;
    this.go(absolute, queryParams, this.finalLocation);
    this.redirectCounter--;

    this.adapter.onAfterNavigate(this.finalLocation);
  }

  start(): void {
    this.adapter.init(this.go);
  }

  addMiddleware(middleware: Middleware): this {
    this.middlewares.push(middleware);
    return this;
  }

  private go = (nodes: string[], params: QueryParams, path: string) => {
    const navigation: RouteNavigationItem[] = [{
      screen: this.root,
      pathname: "",
      pathParams: {},
    }];

    let current: ScreenSearchResult<ScreenDescriptor> | undefined = [this.root, {}];
    let { provider } = getScreenRoutingNavigationContext(this.root);

    for (let i = 0; i < nodes.length; i++) {
      if (!nodes[i]) continue;
      current = provider.findNavigationChild(nodes[i]);
      if (!current) break;

      const screen = getSearchedScreen(current);
      navigation.push({
        screen,
        pathParams: getSearchedParams(current),
        pathname: nodes[i],
      });
    }

    const isError = !current;
    const [finalNavigation, errorScreen] = isError ? this.getErrorNavigation(navigation) : [navigation, this.root];
    const runMiddlewares = this.runMiddlewares(finalNavigation, path, params, isError);
    if (!runMiddlewares) return;

    this.executeNavigation(finalNavigation);
    if (isError) errorScreen.notifyNavigationFailed(path);
  }

  private getErrorNavigation(navigation: RouteNavigationItem[]): ErrorScreenResult {
    for (let i = navigation.length - 1; i >= 0; i--) {
      const {screen} = navigation[i];
      if (isNavigationErrorScreen(screen)) {
        return [navigation.slice(0, i + 1), screen];
      }
    }

    return [[navigation[0]], this.root];
  }

  private createNavigationContext = (navigation: RouteNavigationItem[], pathLength: number, pathParams: PathParams): ScreenNavigationContext => ({
    getNavigator: () => this.createNavigator(navigation, pathLength),
    getCurrentPathname: () => navigation[pathLength - 1].pathname,
    getPathParams: () => pathParams,
    getScreenPath: () => navigation.map(x => x.screen),
  })

  private executeNavigation(navigation: RouteNavigationItem[]) {
    for (let i = 0; i < navigation.length; i++) {
      const { screen, pathParams } = navigation[i];
      getScreenRoutingNavigationContext(screen).consumer.consumeNavigation(this.createNavigationContext(navigation, i , pathParams));
    }

    const { provider: finalProvider } = getScreenRoutingNavigationContext(navigation[navigation.length - 1].screen);
    finalProvider.setNavigationFinalStep();

    for (let i = navigation.length - 2; i >= 0; i--) {
      const { provider } = getScreenRoutingNavigationContext(navigation[i].screen);
      const { screen: next } = navigation[i + 1];
      provider.acceptNavigationChild(next);
    }
  }

  private createNavigator(navigation: RouteNavigationItem[], pathLength = navigation.length): Navigator {
    const pathContext = navigation.slice(1, pathLength).map(x => x.pathname);
    return (dest: string) => ({
      go: queryParams => this.navigate(dest, queryParams, pathContext),
      getPathLocation: queryParams => this.getPathLocation(dest, queryParams, pathContext),
      getLinkLocation: queryParams => this.adapter.wrapLinkPath(this.getPathLocation(dest, queryParams, pathContext)),
    });
  }

  private runMiddlewares(navigation: RouteNavigationItem[], path: string, params: QueryParams, isNavError: boolean): boolean {
    if (!this.middlewares.length) return true;
    let shouldContinue = false;

    const base: Partial<MiddlewareParams> = {
      path,
      isNavError,
      navigate: (dest, queryParams) => this.navigate(dest, queryParams, []),
      navigator: this.createNavigator(navigation),
      screens: navigation,
      queryParams: params,
    }

    const getParams = (index: number) => ({
      ...base,
      next: () => {
        if (index >= this.middlewares.length) {
          shouldContinue = true;
        } else {
          this.middlewares[index](getParams(index + 1));
        }
      }
    } as MiddlewareParams);

    this.middlewares[0](getParams(0));
    return shouldContinue;
  }
}
