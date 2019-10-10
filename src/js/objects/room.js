import axios from 'axios';
const matter = require('gray-matter');

const dirs = {
    n: 'north',
    w: 'west',
    e: 'east',
    s: 'south',
};

export default class Room {
    constructor() {
        this.name = null;
        this.exits = {};
        this.items = {};
        this.npcs = {};

        this.description = null;
    }

    init(room, store) {
        let info = store.state.room[room];

        this.name = info.title;
        this.exits = info.exits;
        this.items = info.items;
        this.npcs = info.npcs;
        this.description = info.description;
    }

    look() {
        return this.description;
    }

    move(dir, store) {
        let room = this.exits[dir];
        if(room === undefined) {
            dir = dirs[dir];
            room = this.exits[dir];
        }

        if(room === undefined) {
            return {
                success: false,
                output: 'You may not move that direction.',
            }
        }

        return {
            success: true,
            output: `You move ${dir}.`,
            room,
        }

    }
};