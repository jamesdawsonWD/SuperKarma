import { Module } from 'vuex';
import { RootState, Network } from '../types';
import { addressZero } from '@/utils';

export const state: Network = {
    coinbase: addressZero,
    networkData: {
        currentBlock: 0,
        network: 'ropsten', // TODO: find a way to dynamically set this for testing and testnet and mainnet!
        networkId: 0
    },
    coinbaseReady: false,
    userAddress: addressZero,
    web3Ready: false,
    contracts: {
        EMPs: {

        },
        syntheticTokens: {

        },
        swapPairs: {

        },
        stakePools: null,
        swapRouter: null,
        clayBonds: null,
        clayToken: null,
    },
    web3: null,
    ethReady: false,
    sentTransactions: {}
};

import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

const namespaced = false;

export const network: Module<Network, RootState> = {
    namespaced,
    state,
    getters,
    mutations,
    actions
};
