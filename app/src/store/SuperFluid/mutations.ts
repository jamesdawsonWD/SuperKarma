import { MutationTree } from 'vuex';
import { SuperFluid } from '../types';

export const mutations: MutationTree<SuperFluid> = {
    SET_SF_USER: (state: SuperFluid, payload: any) => (state.user = payload),
    SET_SF_USER_DETAILS: (state: SuperFluid, payload: any) => (state.userDetails = payload),


};
