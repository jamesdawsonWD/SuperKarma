import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

import '@/styles/index.scss';
import '@/utils/filters';
import * as Utils from '@/utils';
Object.defineProperty(Vue.prototype, '$utils', { value: Utils });
declare global {
    interface Window {
        ethereum: any;
        web3: any;
    }
}
