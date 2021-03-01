import { GetterTree } from 'vuex';
import { RootState, UserInterfaceManager } from '../types';

export const getters: GetterTree<UserInterfaceManager, RootState> = {
    UIM_IsLoading: state => state.isLoading,
    Modal: state => state.modal,
    ShowModal: state => state.modal.show,
    UIM_RecentError: state => state.error,
    UIM_getSuccessMessage: state => state.success.msg,
    UIM_getLocalStarPosition: state => state.localStarPosition,
    UIM_getPlanetDiscoveredMessage: state => state.planetDiscoveredMessage,
    UIM_getPlanetDiscoveredHeader: state => state.planetDiscoveredHeader
};
