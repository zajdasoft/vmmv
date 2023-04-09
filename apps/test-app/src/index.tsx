import React from "react";
import { createRoot } from 'react-dom/client';
import { RenderModel } from "@vmmv/react-mobx";
import RootViewModel from "./RootViewModel";
import { Router } from "@vmmv/router";
import BrowseRoutingAdapter from "@vmmv/router-browser/src/BrowseRoutingAdapter";

function render() {
  const elem = document.querySelector(".react-app");
  if (!elem || !(elem instanceof HTMLElement)) throw "Nothing to render.";

  const rootViewModel = new RootViewModel();
  const router = new Router(rootViewModel, new BrowseRoutingAdapter());

  const reactRoot = createRoot(elem);
  reactRoot.render(<RenderModel vm={rootViewModel} />);

  router.start();
}

render();