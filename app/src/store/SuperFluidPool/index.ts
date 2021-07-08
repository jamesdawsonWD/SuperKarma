import { Module } from 'vuex';
import { RootState, SuperFluidPool } from '../types';
import { addressZero } from '@/utils';

export const state: SuperFluidPool = {
    pools: {},
    balance: '',
    allowance: ''
};

import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

const namespaced = false;

export const superFluidPool: Module<SuperFluidPool, RootState> = {
    namespaced,
    state,
    getters,
    mutations,
    actions
};
