<script setup lang="ts">
import Profile from '../common/Profile.vue';
import GridButton from './GridButton.vue';
import Infobox from './Infobox.vue';

</script>

<template>
    <div class="grid grid-cols-7 grid-rows-5 w-full h-[800px] gap-2">
        <div class="col-start-1 row-start-1 bg-striped"></div>
        <GridButton nav="/blog" title="blog" icon="pixelarticons:notes" class="gridbtn col-start-2 row-start-1 col-span-3 justify-center" />
        <div class="col-start-5 row-start-1 bg-striped"></div>
        <GridButton nav="/about" title="about me!!!!" icon="pixelarticons:human-handsup" class="gridbtn col-start-6 row-start-1 col-span-2 row-span-2 justify-center" />
        
        <GridButton nav="/bookmarks" title="bookmarks" icon="pixelarticons:bookmarks" class="gridbtn col-start-1 row-start-2 row-span-2 justify-center" />
        <div class="col-span-4 col-start-2 row-span-3 row-start-2 p-4 flex flex-col gap-4">
            <Infobox />
        </div>
        
        <Profile class="col-span-2 col-start-6 row-start-3 justify-center items-center"></Profile>

        <div class="col-start-1 row-start-4 bg-striped"></div>
        <div class="col-start-6 row-start-4 col-span-2 row-span-2 p-4">
            <h2>== contacts & links</h2>
            <h3>=== email</h3>
            <p>kuvii@airmail.cc</p>
            <h3>=== signal</h3>
            <p>meow.256</p>
            <h3>=== telegram</h3>
            <p>...</p>
            <h3>=== matrix</h3>
            <p>...</p>
            <h3>=== discord</h3>
            <p>...</p>
        </div>
        
        <GridButton nav="/projects" title="projects" icon="pixelarticons:github" class="gridbtn col-start-1 row-start-5 col-span-4 justify-center" />
        <div class="col-start-5 row-start-5 bg-striped"></div>
    </div>
</template>

<style lang="scss" scoped>
    div.grid > * {
        @apply border-2 border-solid border-gray hover:bg-zinc-700/50;
    }

    .gridbtn {
        @apply cursor-pointer hover:scale-95 active:scale-90;
    }
</style>