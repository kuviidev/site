<script setup lang="ts">
const props = defineProps<{
    id: string;
}>();
</script>

<script lang="ts">
</script>

<template>
    <div class="bord bg-zinc-800">
        <div class="relative flex">
            <!-- On firefox, autoplay doesn't always work because of privacy settings. -->
            <video autoplay muted playsinline loop class="w-full">
                <source :src="`/games/clips/${props.id}_thumbnail.mp4`" type="video/mp4">
                <div>
                    ...
                </div>
            </video>
            <img :src="`/games/logos/${props.id}.png`" alt="game logo" class="absolute max-h-16 max-w-46 left-4 bottom-4">
        </div>
    </div>
</template>
