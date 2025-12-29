<script setup lang="ts">
const props = defineProps<{ title: string, icon: string, nav?: string; }>();
</script>

<template>
    <RouterLink :to="nav ?? '#'" class="gridbtn relative flex flex-col items-center gap-2">
        <Icon :name="props.icon" size="64" />
        <span class="text-lg">{{ props.title }}</span>
    </RouterLink>
</template>

<style lang="scss" scoped>
    // originally wanted to somehow make it random per-element but this is good enough
    @use 'sass:math';

    $random-x1: math.random(100) * 1%;
    $random-y1: math.random(100) * 1%;
    $random-x2: math.random(100) * 1%;
    $random-y2: math.random(100) * 1%;

    @keyframes move {
        0% { background-position: #{$random-x1} #{$random-y1}; }
        100% { background-position: #{$random-x2} #{$random-y2}; }
    }

    .gridbtn, .gridbtn:active, .gridbtn:link {
        @apply text-gray;
    }
    
    .gridbtn::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-image: url('/bg.jpg');
        background-size: auto;
        background-position: center;
        opacity: 0.2;
        animation: move 45s alternate infinite linear;
    }
</style>