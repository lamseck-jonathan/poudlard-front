import { RouteRecordRaw } from 'vue-router';
import authRoutes from 'src/router/auth.routes';
import interviewRoutes from 'src/router/interview.routes';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/dashboard',
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
      {
        path: 'fiche-candidat',
        name: 'fiche-candidat',
        component: () => import('pages/candidat/FicheCandidatPage.vue'),
      },
      {
        path: 'entretiens/formulaire',
        name: 'formulaire-entretien',
        component: () => import('pages/entretien/FormulaireEntretienPage.vue'),
      },
      {
        path: 'resultats',
        name: 'resultats',
        component: () => import('pages/ResultatsPage.vue'),
      },
    ],
  },

  ...authRoutes,
  ...interviewRoutes,

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
