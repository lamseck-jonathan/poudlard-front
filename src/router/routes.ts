import { RouteRecordRaw } from 'vue-router';
import authRoutes from 'src/router/auth.routes';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/test/', component: () => import('pages/TestPage.vue') },
      { path: '/tests/', component: () => import('pages/ListTestsPage.vue') },
    ],
  },
  ...authRoutes,

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
