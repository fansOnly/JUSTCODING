import Vue from 'vue';
import App from './App.vue';

import Directives from './directives';
Vue.use(Directives);


Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
