import { MutationTree } from 'vuex';
import { Network, NetworkData } from '../types';

export const mutations: MutationTree<Network> = {
    SET_WEB3: (state: Network, payload: any) => (state.web3 = payload),
    SET_SF: (state: Network, payload: any) => (state.sf = payload),
    SET_NETWORK_DATA: (state: Network, payload: NetworkData) => (state.networkData = payload),
    SET_ADDRESS: (state: Network, payload: string) => (state.userAddress = payload),
    ADD_SUPER_KARMA_POOL_CONTRACT: (state: Network, payload: { SUPER_KARMA_POOL_CONTRACT: string, address: string }) => {
        return state.contracts.superKarmaPool = {
            ...state.contracts.superKarmaPool,
            ...{
                [payload.address]: payload.SUPER_KARMA_POOL_CONTRACT
            }
        };
    },
    ADD_TOKEN_CONTRACT: (state: Network, payload: { TOKEN_CONTRACT: any; address: string }) => {
        state.contracts.syntheticTokens = {
            ...state.contracts.syntheticTokens,
            ...{
                [payload.address]: payload.TOKEN_CONTRACT
            }
        };

    }

};
