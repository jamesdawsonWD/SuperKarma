import Vue from 'vue';
import Vuex from 'vuex';
import { network } from './Network';
import { tokens } from './Tokens';
import { superFluid } from './SuperFluid';
import { userInterfaceManager } from './UserInterfaceManager';
import { superFluidPool } from './SuperFluidPool';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        version: '1.0.0' // a simple property
    },
    mutations: {},
    actions: {},
    modules: {
        network,
        superFluid,
        userInterfaceManager,
        superFluidPool
    },
    plugins: []
});
