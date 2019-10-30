import moment from "moment";

export default class Item {
    constructor() {
        this.name = null;
        this.items = {};

        this.description = null;
    }

    init(item, store) {
        let info = store.state.item[item];
        this.name = info.name;
        this.items = info.items;
        this.actions = info.actions;
        this.locked = info.locked === undefined?false:info.locked;

        this.description = info.description;
    }

    look(store) {
        let text = this.description;
        text = `### ${this.name}` + "\n\n" + text;

        store.dispatch('history', {
            type: 'description',
            text,
            timestamp: moment().unix(),
        });
    }

    use(store, item) {

    }

    take(store, item, from = null) {

    }

    place(store, item, location) {

    }
};