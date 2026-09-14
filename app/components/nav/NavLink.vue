<script setup lang="ts">
import Button from '~/components/common/Button.vue';

const props = defineProps<{ to: string; striped?: boolean }>();
</script>

<template>
  <Button variant="nav" :to="props.to" :striped="props.striped">
    <slot />
  </Button>
</template>
