import type {
  INavigationContext,
  INavigationErrorScreen,
  INavigationProvider,
  IScreen,
  Navigator,
  PathParams,
  ScreenSearchResult
} from "@vmmv/screen";
import { getSearchedParams, getSearchedScreen, isNavigationErrorScreen } from "@vmmv/screen";
import type { PathContext } from "./PathContext";
import type { Middleware, MiddlewareParams } from "./Middleware";
import type { IRoutingAdapter } from "./IRoutingAdapter";
import type { RouteNavigationItem } from "./RouteNavigationItem";

type ErrorScreenResult<TQueryParams> = [RouteNavigationItem<TQueryParams>[], INavigationErrorScreen<TQueryParams>];

export default class Router<TQueryParams> {
  private readonly middlewares: Middleware<TQueryParams>[] = [];
  maxRedirectCount = 20;
  private finalLocation = "/";
  private redirectCounter = 0;

  constructor(
    private readonly root: INavigationErrorScreen<TQueryParams>,
    private readonly adapter: IRoutingAdapter<TQueryParams>) {}

  getPathLocation(path: string, queryParams: TQueryParams, context: PathContext): string {
    const absolute = this.adapter.parseDestination(path, context);
    return this.adapter.joinPathWithQueryParams(absolute, queryParams);
  }

  navigate(path: string, queryParams: TQueryParams, context: PathContext): void {
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

  addMiddleware(middleware: Middleware<TQueryParams>): this {
    this.middlewares.push(middleware);
    return this;
  }

  private go(nodes: string[], params: TQueryParams, path: string): void {
    const navigation: RouteNavigationItem<TQueryParams>[] = [{
      screen: this.root,
      pathNode: "",
      pathParams: {},
    }];

    let current: ScreenSearchResult<IScreen<TQueryParams>, TQueryParams> | undefined = [this.root, {}];
    let provider: INavigationProvider<TQueryParams> = this.root.navigationProvider;

    for (let i = 0; i < nodes.length; i++) {
      if (!nodes[i]) continue;
      current = provider.findNavigationChild(nodes[i]);
      if (!current) break;

      const screen = getSearchedScreen(current);
      screen.navigationProvider;
      navigation.push({
        screen,
        pathParams: getSearchedParams(current),
        pathNode: nodes[i],
      });
    }

    const isError = !current;
    const [finalNavigation, errorScreen] = isError ? this.getErrorNavigation(navigation) : [navigation, this.root];
    const runMiddlewares = this.runMiddlewares(finalNavigation, path, params, isError);
    if (!runMiddlewares) return;

    this.executeNavigation(finalNavigation);
    if (isError) errorScreen.notifyNavigationFailed(path);

  }

  private getErrorNavigation(navigation: RouteNavigationItem<TQueryParams>[]): ErrorScreenResult<TQueryParams> {
    for (let i = navigation.length - 1; i >= 0; i--) {
      const {screen} = navigation[i];
      if (isNavigationErrorScreen(screen)) {
        return [navigation.slice(0, i + 1), screen];
      }
    }

    return [[navigation[0]], this.root];
  }

  private createNavigationContext = (navigation: RouteNavigationItem<TQueryParams>[], pathLength: number, pathParams: PathParams): INavigationContext<TQueryParams> => ({
    getNavigator: () => this.createNavigator(navigation, pathLength),
    getCurrentPathNode: () => navigation[pathLength - 1].pathNode,
    getPathParams: () => pathParams,
    getScreenPath: () => navigation.map(x => x.screen),
  })

  private executeNavigation(navigation: RouteNavigationItem<TQueryParams>[]) {
    for (let i = 0; i < navigation.length; i++) {
      const { screen, pathParams } = navigation[i];
      screen.navigationConsumer.consumeNavigation(this.createNavigationContext(navigation, i , pathParams));
    }

    const { screen: finalScreen } = navigation[navigation.length - 1];
    finalScreen.navigationProvider.setNavigationFinalStep();

    for (let i = navigation.length - 2; i >= 0; i--) {
      const { screen } = navigation[i];
      const { screen: next } = navigation[i + 1];
      screen.navigationProvider.acceptNavigationChild(next);
    }
  }

  private createNavigator(navigation: RouteNavigationItem<TQueryParams>[], pathLength = navigation.length): Navigator<TQueryParams> {
    const pathContext = navigation.slice(1, pathLength).map(x => x.pathNode);
    return (dest: string) => ({
      go: queryParams => this.navigate(dest, queryParams, pathContext),
      getPathLocation: queryParams => this.getPathLocation(dest, queryParams, pathContext),
      getLinkLocation: queryParams => this.adapter.wrapLinkPath(this.getPathLocation(dest, queryParams, pathContext)),
    });
  }

  private runMiddlewares(navigation: RouteNavigationItem<TQueryParams>[], path: string, params: TQueryParams, isNavError: boolean): boolean {
    if (!this.middlewares.length) return true;
    let shouldContinue = false;

    const base: Partial<MiddlewareParams<TQueryParams>> = {
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
    } as MiddlewareParams<TQueryParams>);

    this.middlewares[0](getParams(0));
    return shouldContinue;
  }
}
