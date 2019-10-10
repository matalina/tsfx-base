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
    import commands from "../commands";
    import game from '../objects/game';
    import Room from '../objects/room'
    import moment from 'moment';

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
                let output;
                let data = commands.parse(this.command, this.count);

                if(data.command === null) {
                    output = 'Invalid command';
                }
                else {
                    switch (data.command.on) {
                        case 'room':
                            let room_number = this.$store.state.current_room;
                            let room = new Room();
                            room.init(room_number, this.$store);
                            let obj = room[data.command.command](data.command.args[0], this.$store);
                            if(obj.success) {
                                output = obj.output;
                            }
                            else {
                                output = obj.output;
                            }
                            break;
                        case 'item':
                            output = 'Do an action on an item';
                            break;
                        case 'npc':
                            output = 'Talk to an NPC';
                            break;
                        case 'game':
                            output = 'Action on game';
                            this.command = null;
                            this[data.command.command]();
                            return;
                        default:
                            output = 'No idea what you want to do';
                    }
                }

                window.EventBus.fire('command-sent', {
                    prompt: true,
                    action: false,
                    description: false,
                    story: false,
                    text: data.text,
                    output,
                    timestamp: data.timestamp,
                });

                this.command = null;
            },

        }
    }
</script>
