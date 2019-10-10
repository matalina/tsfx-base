import initial from "./state";

export default {
    history(state, data) {
        state.history.push(data);
    },
    clear(state) {
        let reset = initial();

        Object.keys(reset).forEach(key => {
            state[key] = reset[key]
        })
    },
    load(state, {type, number, data}) {
        state[type][number] = data;
    },
    start(state) {
        state.new_game = false;
    },

    move(state, room) {
        state.current_room = room;
    }
};
