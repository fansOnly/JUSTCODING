import Vue from 'vue';
import App from './App.vue';

import router from './router';

import Directives from './directives';
Vue.use(Directives);


Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
