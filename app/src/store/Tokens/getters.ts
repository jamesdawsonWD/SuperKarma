import { GetterTree } from 'vuex';
import { RootState, Tokens } from '../types';

export const getters: GetterTree<Tokens, RootState> = {
    TOKENS_getInfo: state => (tokenAddress: string) => state[tokenAddress],
    TOKENS_getName: state => (tokenAddress: string) => state[tokenAddress].name,
    TOKENS_getSymbol: state => (tokenAddress: string) => state[tokenAddress].symbol,
    TOKENS_getBalance: state => (tokenAddress: string) => state[tokenAddress].balance,
    TOKENS_getAll: state => state,
    TOKEN_getAddressBySymbol: state => (symbol: string) => {
        console.log(state);
        for (const token of Object.keys(state)) {
            console.log(symbol == state[token].symbol);
            if (state[token].symbol == symbol) return token;
            console.log(token);
        }
    }
};
