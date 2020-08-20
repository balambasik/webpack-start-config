<template>
    <div class="text">{{ random }}</div>
</template>

<script>
    export default {
        name: "Component2",
        data() {
            return {
                random: Math.random()
            }
        }
    }
</script>

<style lang="less" scoped>
    .text {
        font-size: 5rem;
        font-weight: bold;
        color: fade(#fff, 50)
    }
</style>