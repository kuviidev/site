<script setup lang="ts">
import Game from './Game.vue';
</script>        

<template>
    <div class="flex flex-col gap-2">
        <h1>= games</h1>
        <div class="flex">
            <h2>== actively playing</h2>
            <span class="font-small text-zinc-500" title="(not trying to show off my &quot;skill&quot;, just showing casual gameplay)">(yes, it's my gameplay!!)</span>
        </div>
        <div class="flex gap-2">
            <Game id="wk" />
            <Game id="tf2" />
            <Game id="haste" />
        </div>
        <h2>== occasionally playing</h2>
        <div class="other">
            <span>osu! (standard, 6-7*)</span>
            <span>geometry dash (hardest: icdx)</span>
            <span>tetris (i suck ass)</span>
            <span>atlyss (mystic)</span>
            <span>celeste (expert at most)</span>
            <span>minecraft (survival, hypixel but i suck at pvp)</span>
            <span>beat saber</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @use 'sass:list';
    $colors: ('red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple');

    .other {
        @apply flex gap-2 flex-wrap justify-evenly;

        span {
            @apply text-nowrap bg-zinc-700 text-zinc-400 px-2;
        }

        
    // @for $i from 1 through 7 {
    //     span:nth-child(#{$i}) {
    //         @apply bg-#{list.nth($colors, $i)}-200/50 text-zinc-800 px-2;
    //     }
    // }
    // 
    }
</style>
