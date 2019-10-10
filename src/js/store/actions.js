export default {
    history({ commit }, data) {
        commit('history',data);
    },
    clear({ commit }) {
        commit('clear');
    },
    load({ commit }, data) {
        commit('load', data);
    },
    start({ commit }) {
        commit('start');
    },

    move({ commit }, room) {
        commit('move', room);
    }
};
