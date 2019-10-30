import moment from 'moment';

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
        this.locked = [];

        this.description = null;
    }

    init(room, store) {
        let info = store.state.room[room];
        this.name = info.name;
        this.exits = info.exits;
        this.items = info.items;
        this.npcs = info.npcs;
        this.locked = info.locked;
        this.description = info.description;
    }

    isLocked(dir) {
        return this.locked !== undefined && this.locked.includes(dir)
    }

    look(store) {
        let text = this.description;
        let count = 0;
        let total = Object.keys(this.exits).length;
        text += `\n\n_**Exits:** `;
        for(let i in this.exits) {
            count++;
            text += i;

            if(this.isLocked(i)) {
                text += ` :fa-lock-alt:`;
            }

            if(count < total) {
                text += ', ';
            }
        }
        text += '_\n';

        text = `### ${this.name}` + "\n\n" +text;

        store.dispatch('history', {
            type: 'description',
            text,
            timestamp: moment().unix(),
        });
    }

    move(store, dir) {
        let room = this.exits[dir];
        if(room === undefined) {
            dir = dirs[dir];
            room = this.exits[dir];
        }

        if(this.isLocked(dir)) {
            store.dispatch('history', {
                type: 'warning',
                text: 'This exit is locked. You must find the key to open it.',
                timestamp: moment().unix(),
            });
            return;
        }

        if(room === undefined) {
            store.dispatch('history', {
                type: 'error',
                text: 'You may not move in that direction.',
                timestamp: moment().unix(),
            });
            return;
        }

        store.dispatch('history', {
            type: 'action',
            text: `You move ${dir}.`,
            timestamp: moment().unix(),
        });

        store.dispatch('move', room);

        let new_room = new Room();
        new_room.init(room, store);
        new_room.look(store);
    }
};