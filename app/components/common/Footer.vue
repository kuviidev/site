<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<template>
    <footer class="bord flex flex-col gap-2 p-4">
        <div class="flex justify-between">
            <span>made by kuvii ^^</span>
            <span class="text-zinc-600">Updated at: {{ runtimeConfig.public.updatedAt }}</span>
        </div>
        <hr>
        <h2>badges & frens</h2>
        <div class="flex gap-2 w-full flex-wrap justify-evenly">
            <a href="https://iamsoph.ie/"><img src="/badges/2dcatgirlIRL.png" alt=""></a>
            <a href="https://silly.city/"><img src="/badges/silly.gif" alt=""></a>
            <img src="/badges/twirl.gif" alt="">
            <img src="/badges/twirl.gif" alt="">
            <img src="/badges/twirl.gif" alt="">
            <img src="/badges/twirl.gif" alt="">
            <img src="/badges/twirl.gif" alt="">
            <img src="/badges/twirl.gif" alt="">
            <img src="/badges/twirl.gif" alt="">
            <img src="/badges/twirl.gif" alt="">
            <img src="/badges/twirl.gif" alt="">
        </div>
    </footer>
</template>