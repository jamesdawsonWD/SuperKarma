import { Module } from 'vuex';
import { RootState, Tokens } from '../types';

export const state: Tokens = {

};

import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

const namespaced = false;

export const tokens: Module<Tokens, RootState> = {
    namespaced,
    state,
    getters,
    mutations,
    actions
};
