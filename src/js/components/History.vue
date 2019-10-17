<template>
    <div
        class="shadow m-5 p-4 pb-1"
        :class="classes"

    >
        <div class="inline-block">
            <i class="fas fa-terminal fa-fw" v-if="isType('prompt')"></i>
            <i class="far fa-arrow-right fa-fw" v-if="isType('action')"></i>
            <i class="far fa-exclamation-triangle fa-fw" v-if="isType('warning')"></i>
            <i class="far fa-hand-paper fa-fw" v-if="isType('error')"></i>
        </div>
        <div class="inline-block" v-html="markdown(story.text)"></div>
    </div>
</template>

<script>
    const md = require('markdown-it')();
    const fa = require('markdown-it-fontawesome');

    md.use(fa);
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
            };
        },
        computed: {
            classes() {
                if(this.isType('prompt')) {
                    return 'text-green-600 font-bold'
                }
                else if(this.isType('action')) {
                    return 'text-orange-600 font-bold'
                }
                else if(this.isType('description')) {
                    return 'text-gray-600'
                }
                else if(this.isType('scene') ) {
                    return 'text-gray-800'
                }
                else if(this.isType('error')) {
                    return 'text-red-600'
                }
                else if(this.isType('warning')) {
                    return 'text-yellow-500 font-bold';
                }
                else {
                    return '';
                }
            }
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