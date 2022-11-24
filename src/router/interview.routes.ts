import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/interview',
    component: () => import('layouts/InterviewLayout.vue'),
  },
];

export default routes;
