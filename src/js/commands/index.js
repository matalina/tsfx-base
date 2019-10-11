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

const Command = {
    commands,

    parse(text) {
        let re = /([^ ]+)+/g;
        let matches = text.match(re);
        let command = getCommand(matches);

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
                // look for item (name or short name)

                // look for npc (name or short name)
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