import { createRouter, createWebHistory } from 'vue-router';
import PageHome from '@/pages/Home.vue';
import PageThreadShow from '@/pages/ThreadShow.vue';
import PageNotFound from '@/pages/NotFound.vue';
import sourceDate from '@/data.json';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PageHome,
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: PageThreadShow,
    props: true,
    beforeEnter(to, from, next) {
      // check if thread exists
      const threadExists = sourceDate.threads.find((thread) => thread.id === to.params.id);

      if (!threadExists) {
        next({
          name: 'NotFound',
          params: { pathMatch: to.path.substring(1).split('/') },
          query: to.query,
          hash: to.hash,
        });
      }
      return next();
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: PageNotFound,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
