import { state } from './index';
import { ActionTree, ActionContext } from 'vuex';
import { RootState, SuperFluid } from '../types';
import Web3 from 'web3';
import { addressZero } from '@/utils';
import SuperfluidSDK from '@superfluid-finance/js-sdk';

const SUPER_DAI = '0xc6bEFCf0213322c630040f791A5a3361112441a8';
const SUPER_KARMA_APP = '0xf62F8cAAc412e0539Bc0665df1E992d7CA149b07';

export const actions: ActionTree<SuperFluid, RootState> = {
    async SF_setup(context: ActionContext<SuperFluid, RootState>, payload: { userAddress: string, tokenAddress: string }) {
        const { SF, Address } = context.getters;
        await SF.initialize();
        await context.dispatch('SF_createUser', { userAddress: Address, tokenAddress: SUPER_DAI });
        const { SF_getUser } = context.getters;
        await context.dispatch('SF_retrieveUserDetails', { SF_user: SF_getUser });
    },

    async SF_createUser(context: ActionContext<SuperFluid, RootState>, payload: { userAddress: string, tokenAddress: string }) {
        const { SF } = context.getters;
        console.log(payload);
        const user = await SF.user({
            address: payload.userAddress,
            token: payload.tokenAddress
        });
        context.commit('SET_SF_USER', user);
    },

    async SF_retrieveUserDetails(context: ActionContext<SuperFluid, RootState>, payload: { SF_user: any }) {
        console.log(payload);
        const details = await payload.SF_user.details();
        console.log(details);
        context.commit('SET_SF_USER_DETAILS', details);
    },
    async SF_flow(context: ActionContext<SuperFluid, RootState>, payload: { recipient: string, flowRate: string }) {
        const { SF, SF_getUser } = context.getters;
        try {
            await SF_getUser.flow({
                recipient: payload.recipient,
                flowRate: payload.flowRate,
            });
            await context.dispatch('SF_retrieveUserDetails', { SF_user: SF_getUser });
        } catch (err) {
            console.log(err);
        }
    },



};
