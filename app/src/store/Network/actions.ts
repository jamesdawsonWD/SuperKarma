import { state } from './index';
import { ActionTree, ActionContext } from 'vuex';
import { RootState, Network } from '../types';
import Web3 from 'web3';
import ERC20 from '@/../../blockchain/build/contracts/ERC20.json';
import SuperKarmaPool from '@/../../blockchain/build/contracts/SuperKarmaPool.json';
import { addressZero } from '@/utils';
import SuperfluidSDK from '@superfluid-finance/js-sdk';

const pool1 = '0xe9437ae71621DD9600cEe1557F8BB7F38227A1D4';
const strategy = '0x350A3754841389833edd5D088935a2cfe9B6c546';
const SuperKarmaGovernanceV2 = '0xad3ECa5640BBFDeb296E0271Ca58d261114E5f07'
export const actions: ActionTree<Network, RootState> = {
    setupWeb3(context: ActionContext<Network, RootState>) {
        let web3;
        let sf;
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            sf = new SuperfluidSDK.Framework({
                web3: new Web3(window.ethereum),
            });
            window.ethereum.enable().then((enabled: boolean) => console.log(enabled));
        } else if (window.web3) {
            sf = new SuperfluidSDK.Framework({
                web3: new Web3(window.ethereum),
            });
            web3 = new Web3(window.web3.currentProvider);
        } else {
            // TODO better handle of metamask
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
        context.commit('SET_WEB3', web3);
        context.commit('SET_SF', sf);
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
        await context.dispatch('setupWeb3');
        await context.dispatch('getNetworkData');
        await context.dispatch('SF_setup');
        await context.dispatch('NETWORK_setupSuperKarmaPool', { address: '0x0631FE4E9B8ce716c6b60A541C623589c6a3534A' });
        await context.dispatch('NETWORK_setupSuperKarmaPool', { address: '0x34BEa32d06dB0F72EF76601Ab1A327152934DaCa' });
        await context.dispatch('NETWORK_setupSuperKarmaPool', { address: '0x08C195984CcA135f22521c0fd82650a2EBC4A1Bb' });

    },
    async NETWORK_setupSuperKarmaPool(context: ActionContext<Network, RootState>, payload: { address: string }) {
        const { Web3 } = context.getters;
        const SUPER_KARMA_POOL_CONTRACT = new Web3.eth.Contract(SuperKarmaPool.abi, payload.address);
        await context.commit('ADD_SUPER_KARMA_POOL_CONTRACT', { SUPER_KARMA_POOL_CONTRACT, address: payload.address });
        await context.dispatch('SKP_setup', { address: payload.address });
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
