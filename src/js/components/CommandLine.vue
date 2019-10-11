<template>
    <div
        class="w-full bg-white fixed top-0 left-0 p-3 border-b border-black"
        id="command-line"
    >
        <input
            type="text"
            v-model="command"
            class="border-b border-green-500 p-2 w-full"
            @keyup.enter="execute()"
            placeholder="Enter Command here"
        />
    </div>
</template>

<script>
    import moment from 'moment';
    import commands from "../commands/";
    import game from '../objects/game';
    import Room from '../objects/room'

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
                        output = 'Talk to an NPC';
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
