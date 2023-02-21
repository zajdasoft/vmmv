export interface INavigationRoute<TQueryParams> {
  go(queryParams: TQueryParams): void;

  getLinkLocation(queryParams: TQueryParams): string;

  getPathLocation(queryParams: TQueryParams): string;
}
