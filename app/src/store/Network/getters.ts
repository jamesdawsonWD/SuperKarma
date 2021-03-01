import { GetterTree } from 'vuex';
import { RootState, Network } from '../types';

export const getters: GetterTree<Network, RootState> = {
    Web3: state => state.web3,
    Address: state => state.userAddress,
    Network: state => state.networkData.network,
    NetworkId: (state): number => state.networkData.networkId,
    EMPs: state => (EMP: string) => state.contracts.EMPs[EMP],
    Tokens: state => (syntheticToken: string) => state.contracts.syntheticTokens[syntheticToken],
    ClayToken: state => state.contracts.clayToken,
    ClayBonds: state => state.contracts.clayBonds,
    SwapRouter: state => state.contracts.swapRouter,
    StakePools: state => state.contracts.stakePools,
    SwapPairs: state => (address: string) => state.contracts.swapPairs[address],

};

