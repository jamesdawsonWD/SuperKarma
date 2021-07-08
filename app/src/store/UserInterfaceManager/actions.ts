import { StarPosition } from './../types';
import { ActionTree, ActionContext } from 'vuex';
import { RootState, UserInterfaceManager, Modal } from '../types';
export const actions: ActionTree<UserInterfaceManager, RootState> = {
    UIM_setModalType(context: ActionContext<UserInterfaceManager, RootState>, payload: string) {
        context.commit('SET_MODAL_TYPE', payload);
    },

    UIM_openModal(context: ActionContext<UserInterfaceManager, RootState>, payload: Modal) {
        context.commit('SET_MODAL_STATE', payload);
    },

    UIM_closeModal(context: ActionContext<UserInterfaceManager, RootState>) {
        const modal = {
            show: false,
            content: ''
        };
        context.commit('SET_MODAL_STATE', modal);
    },
    setSuccessMessage(context: ActionContext<UserInterfaceManager, RootState>, msg: string) {
        context.commit('SET_SUCCESS_MESSAGE', msg);
    },
    setError(context: ActionContext<UserInterfaceManager, RootState>, err: Error) {
        context.commit('SET_ERROR', err);
    },
    UIM_setIsLoading(
        context: ActionContext<UserInterfaceManager, RootState>,
        payload: { isLoading: boolean }
    ) {
        context.commit('SET_IS_LOADING', payload);
    },
    UIM_addDonation(context: ActionContext<UserInterfaceManager, RootState>, payload: { donationPool: string }) {
        const { UIM_getDonations } = context.getters;
        console.log('here');
        context.commit('SET_DONATION_ADDRESS', payload.donationPool);

        // if (UIM_getDonations.length == 0) {
        //     console.log('here1');

        //     context.commit('SET_DONATIONS', [{ donationPool: payload.donationPool, flowPercentage: '100' }]);
        //     return;
        // } else {
        //     const basicShare = 100 / (UIM_getDonations.length + 1); // plus two here to increment the index from '0' to '1'
        //     const donations = [];

        //     for (const donation of UIM_getDonations) {
        //         donations.push({
        //             donationPool: donation.donationPool,
        //             flowPercentage: basicShare
        //         })
        //     }

        //     donations.push({
        //         donationPool: payload.donationPool,
        //         flowPercentage: basicShare
        //     })

        //     console.log('here');
        // }
    },



};
