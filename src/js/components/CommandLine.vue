<template>
    <div
        class="w-full bg-gray-900 fixed top-0 left-0 p-3 shadow-md flex"
        id="command-line"
    >
        <label
            class="text-green-300 p-2 border-b-4 border-green-300 flex-initial"
        >
            <i class="fas fa-terminal fa-fw"></i>
        </label>
        <input
            type="text"
            v-model="command"
            class="inline-block bg-gray-900 text-green-300 border-b-4 border-green-300 p-2 w-full flex-initial"
            @keyup.enter="execute()"
            placeholder="Enter Command here"
            style="outline: none"
            autofocus
        />
    </div>
</template>

<script>
    import moment from 'moment';
    import commands from "../commands/";
    import game from '../objects/game';
    import Room from '../objects/room'
    import Person from "../objects/person";

    export default {
        name: 'CommandLine',
        data() {
            return {
                command: null,
                count: 0,
            };
        },
        methods: {
            ...game,
            execute() {
                this.count++;
                let output = null;
                let data = commands.parse(this.command, this.count);

                this.$store.dispatch('history', {
                    type: 'prompt',
                    text: data.text,
                    timestamp: moment().unix(),
                });

                if(data.command === null) {
                    this.$store.dispatch('history', {
                        type: 'error',
                        text: 'Invalid command',
                        timestamp: moment().unix(),
                    });

                    return;
                }
                console.log(data.command);

                switch (data.command.on) {
                    case 'room':
                        let room_number = this.$store.state.current_room;
                        let room = new Room();
                        room.init(room_number, this.$store);
                        room[data.command.command](this.$store, ...data.command.args);
                        break;
                    case 'item':
                        output = 'Do an action on an item';
                        break;
                    case 'npc':
                        let npc = data.command.args[0];
                        let person = new Person();
                        person.init(npc, this.$store);
                        person[data.command.command](this.$store, ...data.command.args);
                        break;
                    case 'game':
                        this[data.command.command]();
                        break;
                    default:
                        output = 'No idea what you want to do';
                }

                this.command = null;
            },
        },
    }
</script>
