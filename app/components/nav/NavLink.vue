<script setup lang="ts">
import { useSfx } from '#imports';

const props = defineProps<{ to: string; striped?: boolean }>();

const { play } = useSfx();
</script>

<template>
  <RouterLink
    :to="props.to"
    :class="['link', { 'bg-striped': props.striped }]"
    @mouseenter="play('tap')"
    @click="play('pluck')">
    <slot />
  </RouterLink>
</template>

<style lang="scss" scoped>
.link {
  @apply flex items-center py-2 px-4 bg-zinc-700 text-gray hover:scale-105 active:scale-95;
}
</style>
