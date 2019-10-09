<template>
    <div id="app">
        <header>
        </header>
        <main>
            <Story></Story>
        </main>
        <footer>
            <CommmandLine></CommmandLine>
        </footer>

    </div>
</template>

<script>
    import Story from "./Story";
    import CommandLine from "./CommandLine";

    export default {
        components: { Story, CommandLine },
        data() {
            return {

            };
        },

    }
</script>
