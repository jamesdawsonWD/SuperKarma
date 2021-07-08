import { Module } from 'vuex';
import { RootState, UserInterfaceManager } from '../types';

export const state: UserInterfaceManager = {
    isLoading: false,
    modal: {
        show: false,
        content: '',
        data: {}
    },
    error: {
        name: '',
        message: ''
    },
    success: {
        msg: ''
    },
    donations: [

    ],
    donationAddress: '',
    donationPools: [
        {
            symbol: 'DAIx',
            name: 'DAIx Token',
            title: 'Cancer Research Fund'
        },
        {
            symbol: 'DAIx',
            name: 'DAIx Token',
            title: 'Cancer Research Fund'
        },
        {
            symbol: 'DAIx',
            name: 'DAIx Token',
            title: 'Cancer Research Fund'
        },
        {
            symbol: 'DAIx',
            name: 'DAIx Token',
            title: 'Cancer Research Fund'
        },
        {
            symbol: 'DAIx',
            name: 'DAIx Token',
            title: 'Cancer Research Fund'
        },
        {
            symbol: 'DAIx',
            name: 'DAIx Token',
            title: 'Cancer Research Fund'
        },
        {
            symbol: 'DAIx',
            name: 'DAIx Token',
            title: 'Cancer Research Fund'
        },
        {
            symbol: 'DAIx',
            name: 'DAIx Token',
            title: 'Cancer Research Fund'
        },
        {
            symbol: 'DAIx',
            name: 'DAIx Token',
            title: 'Cancer Research Fund'
        },
        {
            symbol: 'DAIx',
            name: 'DAIx Token',
            title: 'Cancer Research Fund'
        }
    ],
    planetDiscoveredMessage: '',
    planetDiscoveredHeader: ''
};

import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

const namespaced = false;

export const userInterfaceManager: Module<UserInterfaceManager, RootState> = {
    namespaced,
    state,
    getters,
    mutations,
    actions
};
