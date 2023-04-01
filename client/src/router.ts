import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import Home from '~pages/Home.vue';
import About from '~pages/About.vue';
import Recipe from '~pages/Recipe.vue';

const routes: RouteRecordRaw[] = [
  { name: 'home', path: '/', component: Home },
  { name: 'about', path: '/about', component: About },
  { name: 'recipe', path: '/recipes/:id', component: Recipe },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
