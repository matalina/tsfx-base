import store from '../store';
import moment from "moment";

export default class Mouse {
    constructor() {
        this.ai = [];
        this.memory = [];
    }

    do(args) {
        let text = 'MOUSE replies, "I don\'t understand that command."';

        store.dispatch('history', {
            type: 'description',
            text,
            timestamp: moment().unix(),
        });
    }
}