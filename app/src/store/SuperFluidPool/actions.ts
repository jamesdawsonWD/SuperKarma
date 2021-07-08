import { state } from './index';
import { ActionTree, ActionContext } from 'vuex';
import { RootState, SuperFluidPool } from '../types';
import Web3 from 'web3';

const SUPER_DAI = '0xc6bEFCf0213322c630040f791A5a3361112441a8';
const SUPER_KARMA_APP = '0x7F1b0C2C2b7657BB5840dd86CbF0bCd27b2D9233';

export const actions: ActionTree<SuperFluidPool, RootState> = {
    async SKP_setup(context: ActionContext<SuperFluidPool, RootState>, payload: { address: string }) {
        const { SuperKarmaPool, Address } = context.getters;
        const SKP = SuperKarmaPool(payload.address);

        // const totalDeposits = await SKP.methods.totalDeposits(SUPER_DAI).call();
        const name = await SKP.methods._name().call();

        context.commit('SET_SKP_INFO', {
            address: payload.address,
            name
        })
    },



};
