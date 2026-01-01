<script setup lang="ts">
import Footer from './components/common/Footer.vue';
import Navbar from './components/common/Navbar.vue';
</script>

<template>
    <NuxtLayout>
        <div class="flex flex-col gap-4 font-ega text-zinc-200 bg-zinc-900 min-h-full max-w-[1200px] m-auto p-8">
            <Navbar></Navbar>
            <NuxtPage />
            <Footer></Footer>
        </div>
    </NuxtLayout>
</template>

<style lang="scss">
    $gray: rgba(156, 163, 175, 0.7);
    
    * {
        @apply p-0 m-0;
    }

    .bord {
        @apply border-2 border-solid border-gray;
    }

    #__nuxt, html, body {
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
        background: linear-gradient(45deg, $gray 25%, transparent 25%, transparent 50%, $gray 50%, $gray 75%, transparent 75%, transparent);
        background-size: 41px 41px;
    }

    a {
        @apply text-purple-400;
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
