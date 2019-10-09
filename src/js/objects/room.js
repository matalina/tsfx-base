export default class Room {
    constructor(data) {
        this.name = data.name;
        this.exits = data.exits;
        this.items = data.items;
        this.npcs = data.npcs;

        this.description = data.description;
    }
};