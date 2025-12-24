import { createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { App } from './App';
import { AuthCallback } from './components/AuthCallback';

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
});

const authCallbackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth/callback',
  component: AuthCallback,
});

export const routeTree = rootRoute.addChildren([indexRoute, authCallbackRoute]);
