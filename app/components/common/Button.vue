<script setup lang="ts">
import { computed, resolveComponent } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import { useSfx } from '#imports';

type Variant = 'default' | 'primary' | 'mini' | 'nav' | 'text' | 'icon';

const props = withDefaults(
  defineProps<{
    to?: RouteLocationRaw;
    href?: string;
    variant?: Variant;
    icon?: string;
    iconSize?: string | number;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    active?: boolean;
    danger?: boolean;
    striped?: boolean;
    block?: boolean;
    sfx?: boolean;
  }>(),
  {
    variant: 'default',
    type: 'button',
    iconSize: 16,
    sfx: true,
  }
);

defineOptions({ inheritAttrs: false });

const { play } = useSfx();
const NuxtLink = resolveComponent('NuxtLink');

const isExternal = computed(() => !!props.href && /^https?:\/\//i.test(props.href));
const tag = computed(() => (props.href ? 'a' : props.to ? NuxtLink : 'button'));

const VARIANTS: Record<Variant, string> = {
  default: 'py-2 px-4 bg-zinc-700 text-zinc-400 hover:bg-zinc-600 hover:scale-105 active:scale-95',
  primary: 'py-2 px-4 bg-purple-900 text-purple-200 hover:bg-purple-800 hover:scale-105 active:scale-95',
  mini: 'py-1 px-2 text-sm bg-zinc-700 text-zinc-400 hover:bg-zinc-600 active:scale-95',
  nav: 'py-2 px-4 bg-zinc-700 text-gray hover:scale-105 active:scale-95',
  text: 'text-purple-400 hover:scale-105 active:scale-95',
  icon: 'p-1 border-2 border-solid border-gray bg-zinc-700 text-gray hover:bg-zinc-600 active:scale-90 justify-center',
};

const classes = computed(() => [
  'btn-base inline-flex items-center gap-1 font-ega select-none transition-all',
  VARIANTS[props.variant],
  {
    'bg-striped': props.striped,
    'w-full justify-center': props.block,
    '!text-red-400': props.danger,
    '!bg-purple-900 !text-purple-200': props.active,
    'opacity-50 cursor-not-allowed hover:scale-100 active:scale-100': props.disabled,
  },
]);

const bindings = computed(() => {
  if (props.href) {
    return {
      href: props.disabled ? undefined : props.href,
      'aria-disabled': props.disabled || undefined,
      ...(isExternal.value ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
    };
  }
  if (props.to) {
    return {
      to: props.disabled ? undefined : props.to,
      'aria-disabled': props.disabled || undefined,
    };
  }
  return { type: props.type, disabled: props.disabled };
});

function onMouseenter(): void {
  if (!props.disabled && props.sfx) play('tap');
}

function onClick(event: MouseEvent): void {
  if (props.disabled) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  if (props.sfx) play('pluck');
}
</script>

<template>
  <component
    :is="tag"
    v-bind="{ ...$attrs, ...bindings }"
    :class="classes"
    @mouseenter="onMouseenter"
    @click="onClick"
  >
    <Icon v-if="icon" :name="icon" :size="iconSize" />
    <slot />
  </component>
</template>
