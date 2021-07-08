import { Module } from 'vuex';
import { RootState, SuperFluid } from '../types';
import { addressZero } from '@/utils';

export const state: SuperFluid = {
    user: {},
    flows: {},
    userDetails: {}
};

import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

const namespaced = false;

export const superFluid: Module<SuperFluid, RootState> = {
    namespaced,
    state,
    getters,
    mutations,
    actions
};
