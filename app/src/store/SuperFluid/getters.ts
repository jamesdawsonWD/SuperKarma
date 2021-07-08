import { GetterTree } from 'vuex';
import { RootState, SuperFluid } from '../types';

export const getters: GetterTree<SuperFluid, RootState> = {
    SF_getUser: state => state.user,
    SF_getUserDetails: state => state.userDetails
};

