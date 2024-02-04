import React, { useMemo } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { RouteIds, RouteParamsOf, routes } from 'src/routes';

export type To = {
  [K in RouteIds]: {
    id: K;
    params: RouteParamsOf<K>;
  };
}[RouteIds];

export interface LinkProps extends Omit<RouterLinkProps, 'to'> {
  to: To;
  search?: Record<string, string>;
}

function Link({ to, search, ...props }: LinkProps) {
  const path = useMemo(() => {
    const route = routes[to.id];
    if ('create' in route) {
      return route.create(to.params as any);
    } else {
      return route.path;
    }
  }, []);

  return <RouterLink {...props} to={path} />;
}

export default Link;
