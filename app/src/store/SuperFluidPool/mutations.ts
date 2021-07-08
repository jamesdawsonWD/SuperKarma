import { MutationTree } from 'vuex';
import { SuperFluidPool } from '../types';

export const mutations: MutationTree<SuperFluidPool> = {
    SET_SKP_INFO: (state: SuperFluidPool, payload: { [key: string]: string }) => {
        const pool = {
            ...state.pools[payload.address],
            ...payload,
        };
        state.pools[payload.address] = pool;
    },

};
