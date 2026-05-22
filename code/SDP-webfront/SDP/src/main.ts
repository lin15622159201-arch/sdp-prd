import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import BusinessComponents from '@toy/business-components';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { useInstances } from '@/hooks/use-instances';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import $filters from '@/core/plugins/filter';
import componentsInstall from '@/core/plugins/components-install';
import 'normalize.css';
import '@/styles/index.scss';
import 'virtual:uno.css';
import '@toy/business-components/dist/style.css';
import './core/plugins/permission';
import microAppInit from '@/core/plugins/micro-app';
import directives from '@/directives';
import '@/core/version-polling';
import http from '@/core/http';

microAppInit();
const { setVueInstance } = useInstances();
export const app = createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus, {
    locale: zhCn,
    size: 'small',
  })
  .use(BusinessComponents, undefined, http)
  .use(directives)
  .use($filters);

setVueInstance(app);
componentsInstall(app);
app.mount('#app');
