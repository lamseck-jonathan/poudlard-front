import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/interview',
    component: () => import('layouts/InterviewLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/interview/performing',
      },
      {
        path: 'performing',
        name: 'performing-test',
        component: () => import('pages/interview/PerformingTestPage.vue'),
      },
    ],
  },
];

export default routes;
