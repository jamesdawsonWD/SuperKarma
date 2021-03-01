import { getTxEventParams, SYSTEM_TYPES_IDS } from '@/utils/index';
import { ActionTree, ActionContext } from 'vuex';
import { RootState, Tokens, TxResult } from '../types';
import Web3 from 'web3';

export const actions: ActionTree<Tokens, RootState> = {
    async TOKENS_balanceOf(context: ActionContext<Tokens, RootState>, payload: { tokenAddress: string, address: string }) {
        const { Tokens, Address } = context.getters;
        if (Tokens(payload.tokenAddress) === undefined) {
            await context.dispatch('NETWORK_setupToken', { address: payload.tokenAddress });
        }
        const TOKEN = Tokens(payload.tokenAddress);

        return TOKEN.methods
            .balanceOf(payload.address)
            .call({ from: Address })
            .then((balance: string) => {
                context.commit('SET_TOKEN_BALANCE', { tokenAddress: payload.tokenAddress, balance });
            })
            .catch((err: Error) => context.dispatch('setError', err));
    },
    async TOKENS_symbol(context: ActionContext<Tokens, RootState>, payload: { tokenAddress: string }) {
        const { Tokens, Address } = context.getters;
        if (Tokens(payload.tokenAddress) === undefined) {
            await context.dispatch('NETWORK_setupToken', { address: payload.tokenAddress });
        }
        const TOKEN = Tokens(payload.tokenAddress);

        TOKEN.methods
            .symbol()
            .call({ from: Address })
            .then((tokenSymbol: string) => {
                context.commit('SET_TOKEN_SYMBOL', { tokenAddress: payload.tokenAddress, tokenSymbol });
            })
            .catch((err: Error) => context.dispatch('setError', err));
    },
    async TOKENS_name(context: ActionContext<Tokens, RootState>, payload: { tokenAddress: string }) {
        const { Tokens, Address } = context.getters;
        if (Tokens(payload.tokenAddress) === undefined) {
            await context.dispatch('NETWORK_setupToken', { address: payload.tokenAddress });
        }
        const TOKEN = Tokens(payload.tokenAddress);

        TOKEN.methods
            .name()
            .call({ from: Address })
            .then((tokenName: string) => {
                context.commit('SET_TOKEN_NAME', { tokenAddress: payload.tokenAddress, tokenName });
            })
            .catch((err: Error) => context.dispatch('setError', err));
    },
    async TOKENS_decimals(context: ActionContext<Tokens, RootState>, payload: { tokenAddress: string }) {
        const { Tokens, Address } = context.getters;
        if (Tokens(payload.tokenAddress) === undefined) {
            await context.dispatch('NETWORK_setupToken', { address: payload.tokenAddress });
        }
        const TOKEN = Tokens(payload.tokenAddress);

        TOKEN.methods
            .decimals()
            .call({ from: Address })
            .then((tokenName: string) => {
                context.commit('SET_TOKEN_NAME', { tokenAddress: payload.tokenAddress, tokenName });
            })
            .catch((err: Error) => context.dispatch('setError', err));
    },
    async TOKENS_approve(context: ActionContext<Tokens, RootState>, payload: { tokenAddress: string, spender: string, amount: string }) {
        const { Tokens, Address } = context.getters;
        context.dispatch('UIM_setIsLoading', { isLoading: true });
        console.log(payload, Tokens(payload.tokenAddress));
        if (Tokens(payload.tokenAddress) === undefined) {
            await context.dispatch('NETWORK_setupToken', { address: payload.tokenAddress });
        }
        const TOKEN = Tokens(payload.tokenAddress);
        await TOKEN.methods
            .approve(payload.spender, payload.amount)
            .send({ from: Address });
        console.log({ tokenAddress: payload.tokenAddress, amount: payload.amount });
        context.commit('SET_TOKEN_ALLOWANCE', { tokenAddress: payload.tokenAddress, amount: payload.amount })
        context.dispatch('UIM_setIsLoading', { isLoading: false });
    },
    async TOKENS_allowance(context: ActionContext<Tokens, RootState>, payload: { tokenAddress: string, spender: string }) {
        const { Tokens, Address } = context.getters;
        if (Tokens(payload.tokenAddress) === undefined) {
            await context.dispatch('NETWORK_setupToken', { address: payload.tokenAddress });
        }
        const TOKEN = Tokens(payload.tokenAddress);

        const allowance = await TOKEN.methods
            .allowance(Address, payload.spender)
            .call({ from: Address });

        return allowance;
    },
};
