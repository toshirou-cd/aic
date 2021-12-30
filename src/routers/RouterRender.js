import React from 'react';
import {
  BrowserRouter,
  HashRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
// import { Switch } from "react-router";

import RenderRoute from './RouteRender';

// interface RouterRenderProps {
//   helperRoutes: HelperRoute[];
//   isRoot?: boolean;
//   routerPath?: string;
// }

const RouterRender = (props) => {
  const { helperRoutes, isRoot , routerPath ='' } = props;
  let routes = [];

  helperRoutes.map((r) => {
    const props = {
      path: r.path,
      exact: r.exact,
      component: r.component,
      isPrivate: r.isPrivate,
      layout: r.layout,
      navItems: r.navItems,
      routerPath: routerPath,
      redirectTo: r.redirectTo,
    };
    routes.push(RenderRoute(props));
  });
     routes.push(RenderRoute({}));

  if (isRoot) {
    return (
      <BrowserRouter>
        <Switch>{routes}</Switch>
      </BrowserRouter>
    );
  } else {
    return <Switch>{routes}</Switch>;
  }
};

export default RouterRender;
