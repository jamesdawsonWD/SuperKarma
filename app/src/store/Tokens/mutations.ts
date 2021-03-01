import { MutationTree } from 'vuex';
import { Tokens } from '../types';

export const mutations: MutationTree<Tokens> = {
    SET_TOKEN_SYMBOL: (state: Tokens, payload: { tokenAddress: string; tokenSymbol: string }) => {
        const syntheticToken = {
            ...state[payload.tokenAddress],
            symbol: payload.tokenSymbol
        };
        state[payload.tokenAddress] = syntheticToken;
    },
    SET_TOKEN_NAME: (state: Tokens, payload: { tokenAddress: string; tokenName: string }) => {
        const syntheticToken = {
            ...state[payload.tokenAddress],
            name: payload.tokenName
        };
        state[payload.tokenAddress] = syntheticToken;
    },
    SET_TOKEN_BALANCE: (state: Tokens, payload: { tokenAddress: string; balance: string }) => {
        const syntheticToken = {
            ...state[payload.tokenAddress],
            balance: payload.balance
        };
        state[payload.tokenAddress] = syntheticToken;
    },
};
