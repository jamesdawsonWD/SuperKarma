import { StarPosition } from './../types';
import { MutationTree } from 'vuex';
import { UserInterfaceManager, Modal } from '../types';

export const mutations: MutationTree<UserInterfaceManager> = {
    SET_IS_LOADING: (state: UserInterfaceManager, payload: { isLoading: boolean }) =>
        (state.isLoading = payload.isLoading),
    SET_MODAL_STATE: (state: UserInterfaceManager, payload: Modal) => (state.modal = payload),
    SET_ERROR: (state: UserInterfaceManager, err: Error) => (state.error = err),
    SET_SUCCESS_MESSAGE: (state: UserInterfaceManager, msg: string) => (state.success.msg = msg),
    SET_LOCAL_STAR_POSITION: (state: UserInterfaceManager, pos: StarPosition) =>
        (state.localStarPosition = pos),
    SET_PLANET_DISCOVERED_MESSAGE: (state: UserInterfaceManager, msg: string) =>
        (state.planetDiscoveredMessage = msg),
    SET_PLANET_DISCOVERED_HEADER: (state: UserInterfaceManager, header: string) =>
        (state.planetDiscoveredHeader = header),
    SET_MODAL_TYPE: (state: UserInterfaceManager, payload: string) => (state.modal.type = payload)
};
