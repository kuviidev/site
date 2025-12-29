<script setup lang="ts">
import Games from '~/components/about/Games.vue';
import Introduction from '~/components/about/Introduction.vue';
import Tech from '~/components/about/Tech.vue';

</script>

<template>
    <div class="flex flex-col gap-4">
        <Introduction />
        <hr>
        <Games />
        <hr>
        <Tech />
        <hr>
        <p>other interests include: privacy, linux and FOSS, half life and other valve games, mechanical keyboards, cute clothes, goofy people, anime, crypto (xmr preferred), hugs</p>
        <p>so there you have it :3 i hope i gave you enough material for starting a conversation! contact me if you wanna, i don't bite (only if you want me to :3)</p>
    </div>
    <!--
    <div class="bg-zinc-800">
        <h1>= my writing style</h1>
        <p>it's kinda weirddd.
    </div>
    -->
    <!-- <p>people i like: styropyro, ididathing, much more but i cba to list them all :3</p> -->
</template>

<style lang="scss" scoped>
    hr {
        @apply color-gray;
    }
</style>