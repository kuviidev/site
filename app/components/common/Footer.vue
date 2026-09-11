<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
</script>

<template>
  <footer class="bord flex flex-col gap-2 p-4">
    <div class="flex justify-between">
      <span>made by kuvii ^^</span>
      <span class="text-zinc-600">Updated at: {{ runtimeConfig.public.updatedAt }}</span>
    </div>
    <hr />
    <h2>frens & other badges</h2>
    <div class="badgelist">
      <a href="https://leash.me/"><img src="/assets/badges/chocy-2.webp" alt="" /></a>
      <a href="https://iamsoph.ie/"><img src="/assets/badges/2dcatgirlIRL.png" alt="" /></a>
      <a href="https://eightyeightthirty.one/#kuvii.me"><img src="/assets/badges/88x31.png" alt="" /></a>
      <a href="https://www.getmonero.org/"><img src="/assets/badges/monero-now.gif" alt="" /></a>
      <a href="https://www.gentoo.org/"><img src="/assets/badges/gentoo.gif" alt="" /></a>
      <a href="https://silly.city/"><img src="/assets/badges/silly.gif" alt="" /></a>
      <a href="https://lucida.to/"><img src="/assets/badges/lucida.gif" alt="" /></a>
      <img src="/assets/badges/youre_telling_me.png" alt="" />
      <img src="/assets/badges/twopaws.png" alt="" />
      <img src="/assets/badges/twirl.gif" alt="" />
      <img src="/assets/badges/twirl.gif" alt="" />
    </div>
    <div class="thinbadgelist">
      <img src="/assets/badges/thin/100fool.gif" alt="" />
      <img src="/assets/badges/thin/100sarcastic.gif" alt="" />
      <img src="/assets/badges/thin/notbig.gif" alt="" />
      <img src="/assets/badges/thin/blonde.gif" alt="" />
      <img src="/assets/badges/thin/notclever.gif" alt="" />
      <img src="/assets/badges/thin/clueless.gif" alt="" />
      <img src="/assets/badges/thin/legs.gif" alt="" />
      <img src="/assets/badges/thin/sennheiser.gif" alt="" />
      <img src="/assets/badges/thin/sonic.gif" alt="" />
      <img src="/assets/badges/thin/fuckgender.png" alt="" />
      <img src="/assets/badges/thin/gentoo.png" alt="" />
      <img src="/assets/badges/thin/retarded.gif" alt="" />
      <img src="/assets/badges/thin/sane0.gif" alt="" />
      <img src="/assets/badges/thin/weird.gif" alt="" />
      <img src="/assets/badges/thin/usepgp.gif" alt="" />
      <img src="/assets/badges/thin/pure.gif" alt="" />
      <img src="/assets/badges/thin/geek.gif" alt="" />
      <img src="/assets/badges/thin/linux100.gif" alt="" />
      <img src="/assets/badges/thin/vim_the_editor.png" alt="" />
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.badgelist,
.thinbadgelist {
  @apply flex gap-2 w-full flex-wrap justify-evenly;

  img:hover {
    transform: scale(1.1);
  }

  .badgelist img {
    width: 88px;
    height: 31px;
  }
}
</style>
