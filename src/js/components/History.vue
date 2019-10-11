<template>
    <div
        :class="classes"
    >
        <span
            v-if="story.prompt"
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
                    'text-green-600': this.story.prompt,
                    'font-semibold': this.story.prompt,
                    'text-orange-600': this.story.action,
                    'text-gray-600': this.story.description,
                    'text-gray-800': this.story.scene,
                }
            };
        },
    }
</script>