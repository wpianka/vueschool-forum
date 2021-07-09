import { createApp } from 'vue';
import router from '@/router';
import App from './App.vue';

const forumApp = createApp(App);
forumApp.use(router);

const requireComponent = require.context('./components', true, /App[A-Z]\w+\.(vue|js)$/);
requireComponent.keys().forEach((fileName) => {
  let baseComponentConfig = requireComponent(fileName);
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig;
  const baseComponentName = baseComponentConfig.name || (
    fileName
      .replace(/^\.\/_/, '')
      .replace(/\.\w+$/, '')

  );
  forumApp.component((baseComponentName, baseComponentConfig));
});
forumApp.mount('#app');
