import { state } from './index';
import { ActionTree, ActionContext } from 'vuex';
import { RootState, Network } from '../types';
import Web3 from 'web3';
// import EMP from '@/../../blockchain/build/contracts/ExpiringMultiParty.json';
import ERC20 from '@/../../blockchain/build/contracts/ERC20.json';
import { addressZero } from '@/utils';

export const actions: ActionTree<Network, RootState> = {
    setupWeb3(context: ActionContext<Network, RootState>) {
        let web3;
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            window.ethereum.enable().then((enabled: boolean) => console.log(enabled));
            web3.eth.ens;
        } else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
        } else {
            // TODO better handle of metamask
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
        context.commit('SET_WEB3', web3);
    },
    async getNetworkData(context: ActionContext<Network, RootState>) {
        const { Web3, Address } = context.getters;
        const network = await Web3.eth.net.getNetworkType();
        const networkId = await Web3.eth.net.getId();
        const currentBlock = await Web3.eth.getBlockNumber();
        context.commit('SET_NETWORK_DATA', {
            network,
            networkId,
            currentBlock
        });

        if (Address == addressZero)
            await context.dispatch('setAddress', { address: Web3.currentProvider.selectedAddress });

    },
    async setAddress(context: ActionContext<Network, RootState>, payload: { address: string }) {
        context.commit('SET_ADDRESS', payload.address);
    },

    async bootstrapContracts(context: ActionContext<Network, RootState>) {
        const { Address } = context.getters;
        await context.dispatch('setupWeb3');
        await context.dispatch('getNetworkData');


        const tokenAddresses = [
            '0x7F71541f34e2C04ad7d42b2FA1c11Fad188503af',
            '0x75E29300937497bE6Dbe8d1772d3f42155D3092e',
            '0xD41A7F1f8334C8c01dDD4dCAde4686A95453FEc7'
        ];

        const tokensP = tokenAddresses.map(address => context.dispatch('NETWORK_setupToken', { address }));
        await Promise.all(tokensP);

    },

    async NETWORK_setupToken(context: ActionContext<Network, RootState>, payload: { address: string }) {
        const { Web3, NetworkId, Address } = context.getters;
        const TOKEN_CONTRACT = new Web3.eth.Contract(ERC20.abi, payload.address);
        await context.commit('ADD_TOKEN_CONTRACT', { TOKEN_CONTRACT, address: payload.address });
        await context.dispatch('TOKENS_name', { tokenAddress: payload.address });
        await context.dispatch('TOKENS_symbol', { tokenAddress: payload.address });
        await context.dispatch('TOKENS_balanceOf', { tokenAddress: payload.address, address: Address });

    },
};

interface Networks {
    [key: string]: Record<string, any>;
}
