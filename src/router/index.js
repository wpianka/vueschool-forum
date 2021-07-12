import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import ThreadShow from '@/pages/ThreadShow.vue';
import NotFound from '@/pages/NotFound.vue';
import Forum from '@/pages/Forum.vue';
import Category from '@/pages/Category.vue';
import Profile from '@/pages/Profile.vue';
import sourceDate from '@/data.json';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/me',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: Category,
    props: true,
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    component: Forum,
    props: true,
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: ThreadShow,
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
    component: NotFound,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
