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

    UIM_setLocalStarPosition(context: ActionContext<UserInterfaceManager, RootState>, pos: StarPosition) {
        context.commit('SET_LOCAL_STAR_POSITION', pos);
    },

    UIM_setPlanetDiscoveredUi(
        context: ActionContext<UserInterfaceManager, RootState>,
        payload: { header: string; message: string }
    ) {
        context.commit('SET_PLANET_DISCOVERED_MESSAGE', payload.message);
        context.commit('SET_PLANET_DISCOVERED_HEADER', payload.header);
    }
};
