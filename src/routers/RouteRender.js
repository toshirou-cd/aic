import React, { ReactNode, useMemo } from 'react';
import { Route, Navigate, match, Redirect} from 'react-router-dom';
import PageNotFound from './../pages/PageNotFound'
import { useSelector } from 'react-redux';
// export interface RouteRenderProps {
//   component?: React.FC<{ match: match }>;
//   layout?: React.FC<{
//     children: ReactNode;
//     routerPath: string;
//     navItems?: NavItem[];
//   }>;
//   navItems?: NavItem[];
//   path?: string;
//   exact?: boolean;
//   isPrivate?: boolean;
//   routerPath?: string;
//   redirectTo?: string;
// }

const RenderRoute = (props) => {
  const {
    component: Component,
    layout: Layout,
    path,
    exact,
    routerPath,
    navItems,
    isPrivate,
    redirectTo,
  } = props;

  // const { isAuthenticated } = useAuth();
  // const isAuth = useMemo(() => isAuthenticated(), [isAuthenticated]);
  const isAuth = useSelector((state) => state.AuthReducer.isLoggedIn)

  if (!Component && !redirectTo) {
    return <Route key="" path="/notfound" />;
  }

  return (
    <Route
      key={`${routerPath}${path}`}
      path={`${routerPath}${path}`}
      exact={exact}
      render={(componentProps) => {
        if (Component) {
          if ((isPrivate && isAuth) || !isPrivate) {
            if (Layout) {
              return (
                <Layout
                  routerPath={componentProps.match.path}
                  navItems={navItems}
                >
                  <Component match={componentProps.match} />
                </Layout>
              );
            }
            return <Component match={componentProps.match} />;
          }
        }
        if (redirectTo) {
          return <Redirect to={`${routerPath}${redirectTo}`} />;
        }
        return <Redirect to="/notfound" />;
      }}
    />
  );
};

export default RenderRoute;
