import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/interview',
    component: () => import('layouts/InterviewLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/interview/home',
      },
      {
        path: 'home',
        name: 'interview-home',
        component: () => import('pages/interview/HomePage.vue'),
      },
      {
        path: 'performing',
        name: 'performing-test',
        component: () => import('pages/interview/PerformingTestPage.vue'),
      },
      {
        path: 'finished',
        name: 'interview-finished',
        component: () => import('pages/interview/FinishedPage.vue'),
      },
    ],
  },
];

export default routes;
