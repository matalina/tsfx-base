import moment from "moment";

export default class Item {
    constructor() {
        this.name = null;
        this.items = {};

        this.description = null;
    }

    init(data) {
        this.name = data.title;
        this.items = data.items;

        this.description = data.description;
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
};