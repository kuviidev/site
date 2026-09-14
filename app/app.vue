<script setup lang="ts">
import Footer from './components/common/Footer.vue';
import Navbar from './components/common/Navbar.vue';

useSeoMeta({
  title: "kuvii's webby site",
  ogTitle: "kuvii's webby site",
  description: 'my personal website',
  ogDescription: 'my personal website',
});
</script>

<template>
  <NuxtLayout>
    <div class="flex flex-col gap-4 font-ega text-zinc-200 bg-zinc-900 min-h-full max-w-[1200px] m-auto p-8">
      <Navbar />
      <NuxtPage />
      <Footer />
    </div>
  </NuxtLayout>
</template>

<style lang="scss">
$gray: rgba(156, 163, 175, 0.7);

* {
  @apply p-0 m-0;
  box-sizing: border-box;
}

button,
input,
select,
textarea {
  font-family: inherit;
  color: inherit;
}

button {
  @apply bg-transparent cursor-pointer;
  border: none;
}

@for $i from 3 through 1 {
  h#{$i}:not(:first-child):not(hr + h#{$i}) {
    @apply pt-4;
  }
}

.bord {
  @apply border-2 border-solid border-gray;
}

#__nuxt,
html,
body {
  @apply bg-zinc-950 h-full min-h-full;
}

p {
  @apply text-zinc-400;
}

li {
  @apply ml-4;
}

.badge {
  image-rendering: pixelated;
}

.bg-striped {
  background: linear-gradient(
    45deg,
    $gray 25%,
    transparent 25%,
    transparent 50%,
    $gray 50%,
    $gray 75%,
    transparent 75%,
    transparent
  );
  background-size: 41px 41px;
}

a {
  @apply text-purple-400;
}

.hashtag {
  @apply text-purple-300 font-model3x;
}

hr {
  @apply text-gray;
}

table {
  @apply border-gray border-2 border-solid border-spacing-sm;

  thead {
    @apply bg-zinc-700 text-zinc-400;
  }
}
</style>
