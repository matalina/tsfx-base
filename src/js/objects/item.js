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
};