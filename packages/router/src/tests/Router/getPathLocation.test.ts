import type { IRoutingAdapter } from "../../IRoutingAdapter";
import Router from "../../Router";
import type { INavigationErrorScreen } from "@vmmv/screen";

describe("Router getPathLocation", () => {
  it("Constructs the path using the adapter.", () => {
    const adapter: IRoutingAdapter<{}> = {
      parseDestination: jest.fn(),
      joinPathWithQueryParams: jest.fn(),
      wrapLinkPath: jest.fn(),
      init: jest.fn(),
      onBeforeNavigate: jest.fn(),
      onAfterNavigate: jest.fn(),
    } as const;

    (adapter.parseDestination as jest.Mock).mockReturnValue(["test", "path"]);
    (adapter.joinPathWithQueryParams as jest.Mock).mockReturnValue("/test/path?query=1");

    const screen: INavigationErrorScreen<{}> = {
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
      query: 1
    }, ["current", "path"])).toBe("/test/path?query=1");
    expect(1).toBe(1);
  });
})