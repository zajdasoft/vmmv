import type { RoutingAdapter } from "../../RoutingAdapter";
import Router from "../../Router";
import type { NavigationErrorScreen } from "@vmmv/screen";

describe("Router getPathLocation", () => {
  it("Constructs the path using the adapter.", () => {
    const adapter: RoutingAdapter = {
      parseDestination: jest.fn(),
      joinPathWithQueryParams: jest.fn(),
      wrapLinkPath: jest.fn(),
      init: jest.fn(),
      onBeforeNavigate: jest.fn(),
      onAfterNavigate: jest.fn(),
    } as const;

    (adapter.parseDestination as jest.Mock).mockReturnValue(["test", "path"]);
    (adapter.joinPathWithQueryParams as jest.Mock).mockReturnValue("/test/path?query=1");

    const screen: NavigationErrorScreen = {
      notifyNavigationFailed: jest.fn(),
      navigationProvider: ({
        acceptNavigationChild: jest.fn(),
        findNavigationChild: jest.fn(),
        matchNavigation: jest.fn(),
        setNavigationFinalStep: jest.fn(),
      }),
      navigationConsumer: ({
        consumeNavigation: jest.fn(),
      }),
    };

    const router = new Router(screen, adapter);

    expect(router.getPathLocation("/test/path", {
      query: "1"
    }, ["current", "path"])).toBe("/test/path?query=1");
  });
})