<template>
    <div
        ref="story"
        class="mt-20"
    >
        <History
            v-for="(h,i) in sort_history"
            class="m-1 p-2"
            :key="i"
            :story="h"
        ></History>
    </div>
</template>

<script>
    import History from "./History";
    import moment from 'moment';

    export default {
        name: 'Story',
        components: { History, },
        data() {
            return {

            }
        },
        computed: {
            history() {
                return this.$store.state.history;
            },
            sort_history() {
                return this.history.sort((a,b) => {
                    let i = 0;
                    if(a.prompt) {
                        i = 1;
                    }
                    return a.timestamp - b.timestamp - i;
                }).reverse();
            },
        },
        methods: {

        },
        mounted() {
        }
    }
</script>
