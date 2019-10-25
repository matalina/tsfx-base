import moment from 'moment';
import commands from "./commands";
import store from '../store';

class Action {
    constructor(command) {
        this.command =  command.command;
        this.on = command.on;
        this.args = command.args;
    }

    setOn(value) {
        this.on = value;
    }

    addArg(value) {
        this.args.push(value);
    }

    removeArg(value) {
        let index = this.arg.indexOf(value);
        this.arg = this.arg.splice(index,1);
    }

    isValid() {
        return this.command !== null;
    }

    hasNoArguments() {
        return this.args.length === 0;
    }

    getArguments(parts) {
        let index = parts.indexOf(this.command);
        let slice = parts.splice(index,1);
        this.args = parts;
    }

    hasNoObject() {
        return this.on === null;
    }

    getCommandObject() {
        return {
            command: this.command,
            on: this.on,
            args: this.args,
        }
    }

    findObject() {
        let command = this;
        // empty arguments
        if(command.args.length === 0) {
            command.on = 'room';
            command.args = [store.state.current_room];
        }
        // Look for self
        else if(command.args.includes('self')) {
            command.on = 'npc';
            command.args = ['0000'];
        }
        // look for npc or item(name or short name)
        else {
            let obj;
            for(let i in command.args) {
                let arg = command.args[i];
                obj = find(arg);

                if(obj !== false) {
                    this.on = obj.on;
                    this.args = obj.args;
                    return true;
                }
            }

            return false;
        }
    }
}


function getCommand(matches) {
    for(let i in matches) {
        let match = matches[i];

        if(Command.commands[match] !== undefined) {
            return  Command.commands[match];
        }
    }

    return null;
}

function find(text) {
    // is self
    if(text === 'self') {
        return {
            on: 'npc',
            args: ['0000'],
        };
    }

    // is NPC
    let npcs = store.state.npc;
    for(let i in npcs) {
        let npc = npcs[i];
        if(npc.shortname === text) {
            return {
                on: 'npc',
                args: [i],
            };
        }
    }

    // is Item
    let items = store.state.item;
    for(let i in items) {
        let npc = items[i];
        if(npc.shortname === text) {
            return {
                on: 'item',
                args: [i],
            };
        }
    }

    return false;
}

const Command = {
    commands,

    parse(text) {
        let re = /([^ ]+)+/g;
        let matches = text.match(re);
        let action = getCommand(matches);

        if(action === null) { // there is no matching command
            return null;
        }

        let command = new Action(action);

        if(command.isValid() && command.hasNoArguments()) {
            command.getArguments(matches);
        }

        if(command.hasNoObject()) {
            if(command.hasNoArguments()) {
                command.setOn('room');
                command.addArg(store.state.current_room);
            }
            else {
                let on = command.findObject();
                if(on === false) {
                   return null;
                }
            }
        }

        return {
            text: text,
            command: command.getCommandObject(),
            timestamp: moment().unix(),
        }
    },

};

export default Command;