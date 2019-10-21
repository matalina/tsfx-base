import moment from 'moment';
import commands from "./commands";

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
    // is NPC

    // is Item

    return false;
}

const Command = {
    commands,

    parse(text) {
        let re = /([^ ]+)+/g;
        let matches = text.match(re);
        let command = getCommand(matches);

        console.log(text, command);

        if(command !== null && command.args.length === 0) {
            let command_index = matches.indexOf(command.command);
            matches.splice(command_index,1);
            command.args = matches;
        }

        if(command.on === null) {
            if(command.args.length === 0) {
                command.on = 'room';
            }
            else {
                // Look for self
                if(command.args.includes('self')) {
                    command.on = 'npc';
                    command.args = ['0000'];
                }
                // look for npc (name or short name)
                // look for item (name or short name)
                else {
                    let found = false;
                    let obj;
                    for(let i in command.args) {
                        let arg = command.args[i];
                        obj = find(arg);
                        found = true;
                        if(obj !== false) {
                            break;
                        }
                    }

                    if(! found) {
                        command = null;
                    }
                    else {
                        command = obj;
                    }
                }
            }
        }

        return {
            text: text,
            command,
            timestamp: moment().unix(),
        }
    },

};

export default Command;