import { RouteRecordRaw } from 'vue-router';
import authRoutes from 'src/router/auth.routes';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: 'dashboard',
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('pages/DashboardPage.vue'),
      },
      {
        path: 'utilisateurs',
        name: 'utilisateur',
        component: () => import('pages/UtilisateursPage.vue'),
      },
      {
        path: 'tests',
        name: 'test',
        component: () => import('pages/TestsPage.vue'),
      },
      {
        path: 'entretiens',
        name: 'entretien',
        component: () => import('pages/EntretiensPage.vue'),
      },
      {
        path: 'sujets',
        name: 'sujet',
        component: () => import('pages/SujetsPage.vue'),
      },
      {
        path: 'candidats',
        name: 'candidat',
        component: () => import('pages/CandidatsPage.vue'),
      },
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
