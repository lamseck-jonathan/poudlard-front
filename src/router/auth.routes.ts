import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/auth/login',
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('src/pages/auth/LoginPage.vue'),
      },
      {
        path: 'signin',
        name: 'signIn',
        component: () => import('src/pages/auth/SignInPage.vue'),
      },
    ],
  },
];

export default routes;
