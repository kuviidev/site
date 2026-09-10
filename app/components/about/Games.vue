<script setup lang="ts">
import Game from './Game.vue';
</script>

<template>
  <div class="flex flex-col gap-2">
    <h1>= games</h1>
    <div class="flex">
      <h2>== some of my gameplay</h2>
    </div>
    <div class="flex gap-2">
      <Game id="wk" />
      <Game id="tf2" />
      <Game id="haste" />
    </div>
    <h2>== other games i play</h2>
    <div class="other">
      <span>osu! (lazer)</span>
      <span>geometry dash (hardest: icdx)</span>
      <span>beat saber</span>
      <span>minecraft (survival, hypixel but i suck at pvp)</span>
      <span>lethal company</span>
    </div>
    <h2>== other games i like</h2>
    <div class="other">
      <span>deltarune</span>
      <span>omori</span>
      <span>celeste</span>
      <span>atlyss</span>
      <span>detroit: become human</span>
      <span>half life</span>
      <span>portal</span>
      <span>sonic generations</span>
      <span>touhou 6</span>
      <span>sonic generations</span>
      <span>tetris (i suck ass)</span>
      <span>old need for speed</span>
      <span>need for speed</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:list';
$colors: (
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple'
);

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
