<template>
    <div
        :class="classes"
        v-html="markdown(story.text)"
    ></div>
</template>

<script>
    let md = require('markdown-it')();
    /*
    History Object
        type
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
                    'text-green-600': this.isType('prompt'),
                    'font-semibold': this.isType('prompt'),
                    'text-orange-600': this.isType('action'),
                    'text-gray-600': this.isType('description'),
                    'text-gray-800': this.isType('scene'),
                    'text-red-600': this.isType('error'),
                }
            };
        },
        methods: {
            isType(name) {
                return this.story.type === name;
            },
            markdown(value) {
                return md.render(value);
            }
        }
    }
</script>