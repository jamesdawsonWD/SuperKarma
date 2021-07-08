import { GetterTree } from 'vuex';
import { RootState, Network } from '../types';

export const getters: GetterTree<Network, RootState> = {
    Web3: state => state.web3,
    SF: state => state.sf,
    Address: state => state.userAddress,
    Network: state => state.networkData.network,
    NetworkId: (state): number => state.networkData.networkId,
    SuperKarmaPool: state => (address: string) => state.contracts.superKarmaPool[address],
    SuperKarmaPools: state => state.contracts.superKarmaPool

};

