import { ComponentType } from 'react';
import AboutView from '~pages/about-view';
import HomeView from '~pages/home-view';
import RecipeDetailView from '~pages/recipe-detail-view';
import RecipeView from '~pages/recipe-view';

type CreateRouteFunc<TParams extends Record<string, string>> = (params: TParams) => string;
export interface RouteDefinition<TParams extends Record<string, string>> {
  path: string;
  Component: ComponentType;
  create?: CreateRouteFunc<TParams>;
}

export const routes = {
  'home': { path: '/', Component: HomeView },
  'about': { path: '/about', Component: AboutView },
  'recipe': { path: '/recipes', Component: RecipeView },
  'recipe-detail': { 
    path: '/recipes/:id', 
    Component: RecipeDetailView, 
    create: (params: { id: string }) => `/recipes/${params.id}`,
  },
} satisfies Record<string, RouteDefinition<any>>;

type Routes = typeof routes;
export type RouteIds = keyof Routes;
export type RouteParamsOf<TId extends RouteIds> = Routes[TId] extends {create: CreateRouteFunc<infer TParams>} ? TParams : Record<string, never>;

