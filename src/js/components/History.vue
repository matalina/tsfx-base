<template>
    <div
        :class="classes"
    >
        <span
            v-if="prompt"
        >> </span>
        {{ story.text }}
    </div>
</template>

<script>
    /*
    History Object
        prompt
        action
        description
        story
        text
        output (optional)
        timestamp
     */
    export default {
        name: 'History',
        props: ['story'],
        data() {
            return {
                classes: {
                    'text-green-600': this.prompt,
                    'font-weight-bold': this.prompt,
                    'text-orange-600': this.action,
                    'text-gray-600': this.description,
                    'text-gray-800': this.scene,
                }
            };
        },
        computed: {
            prompt() {
                return this.story.prompt;
            },
            action() {
                return this.story.action;
            },
            description() {
                return this.story.description;
            },
            scene() {
                return this.story.story;
            }

        }
    }
</script>