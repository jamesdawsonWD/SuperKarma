import { GetterTree } from 'vuex';
import { RootState, SuperFluidPool } from '../types';

export const getters: GetterTree<SuperFluidPool, RootState> = {
    SKP_getAll: state => state.pools,
    SKP_getName: state => (address: string) => state.pools[address] ? state.pools[address].name : false
};

