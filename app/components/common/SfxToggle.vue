<script setup lang="ts">
import { useSfx } from '#imports';

const { enabled, toggle } = useSfx();
</script>

<template>
  <label class="toggle" :title="enabled ? 'sfx on' : 'sfx off'">
    <input type="checkbox" :checked="enabled" class="sr-only" @change="toggle" />
    <span class="box">
      <Icon :name="enabled ? 'pixelarticons:volume-2' : 'pixelarticons:volume-x'" size="14" />
    </span>
    <span class="label">sfx</span>
  </label>
</template>

<style lang="scss" scoped>
.toggle {
  @apply flex items-center gap-1.5 cursor-pointer select-none;
}

.box {
  @apply border-2 border-solid border-gray bg-zinc-700 text-gray flex items-center justify-center
         hover:bg-zinc-600 active:scale-90 transition-all;
  width: 24px;
  height: 24px;

  .toggle input:checked ~ & {
    @apply bg-zinc-600 text-zinc-200;
  }
}

.label {
  @apply text-gray text-sm;
}
</style>
