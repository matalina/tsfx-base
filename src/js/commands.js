import moment from 'moment';

function getCommand(matches) {
    for(let i in matches) {
        let match = matches[i];

        if(commands.commands[match] !== undefined) {
            return  commands.commands[match];
        }
    }

    return null;
}

const commands = {
    commands: {
        // Game
        clear: {command: 'resetGame', on: 'game', args: [''] },
        help: {command: 'help', on: 'game', args: [] },
        // Movement
        n: { command: 'move', on: 'room', args: ['n'] },
        north: { command: 'move', on: 'room', args: ['north'] },
        w: { command: 'move', on: 'room', args: ['w'] },
        west: { command: 'move', on: 'room', args: ['west'] },
        e: { command: 'move', on: 'room', args: ['e'] },
        east: { command: 'move', on: 'room', args: ['east'] },
        s: { command: 'move', on: 'room', args: ['s'] },
        south: { command: 'move', on: 'room', args: ['south'] },
        u: { command: 'move', on: 'room', args: ['u'] },
        up: { command: 'move', on: 'room', args: ['up'] },
        d: { command: 'move', on: 'room', args: ['d'] },
        down: { command: 'move', on: 'room', args: ['down'] },
        move: { command: 'move', on: 'room', args: [] },
    },

    parse(text) {
        let re = /([^ ]+)+/g;
        let matches = text.match(re);
        let command = getCommand(matches);


        if(command !== null && command.args.length === 0) {
            let command_index = matches.indexOf(command.command);
            matches.splice(command_index,1);
            command.args = matches;
        }

        return {
            text: text,
            command,
            timestamp: moment().unix(),
        }
    },

};

export default commands;