import moment from "moment";

export default class Person {
    constructor() {
        this.name = null;
        this.items = {};

        this.description = null;
    }

    init(person, store) {
        let info = store.state.npc[person];
        this.name = info.name;
        this.items = info.items;
        this.always = info.always;
        this.actions = info.actions;

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

    talk(store) {

    }

    give(store, item) {

    }
};