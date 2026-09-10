<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<template>
  <footer class="bord flex flex-col gap-2 p-4">
    <div class="flex justify-between">
      <span>made by kuvii ^^</span>
      <span class="text-zinc-600">Updated at: {{ runtimeConfig.public.updatedAt }}</span>
    </div>
    <hr />
    <h2>badges & frens</h2>
    <div class="badgelist">
      <a href="https://leash.me/"><img src="/badges/chocy-2.webp" alt="" /></a>
      <a href="https://iamsoph.ie/"><img src="/badges/2dcatgirlIRL.png" alt="" /></a>
      <a href="https://silly.city/"><img src="/badges/silly.gif" alt="" /></a>
      <img src="/badges/monero-now.gif" alt="" />
      <img src="/badges/youre_telling_me.png" alt="" />
      <img src="/badges/twopaws.png" alt="" />
      <img src="/badges/twirl.gif" alt="" />
      <img src="/badges/twirl.gif" alt="" />
      <img src="/badges/twirl.gif" alt="" />
      <img src="/badges/twirl.gif" alt="" />
      <img src="/badges/twirl.gif" alt="" />
    </div>
    <div class="thinbadgelist">
      <img src="/badges/thin/100fool.gif" alt="" />
      <img src="/badges/thin/100sarcastic.gif" alt="" />
      <img src="/badges/thin/notbig.gif" alt="" />
      <img src="/badges/thin/blonde.gif" alt="" />
      <img src="/badges/thin/notclever.gif" alt="" />
      <img src="/badges/thin/clueless.gif" alt="" />
      <img src="/badges/thin/legs.gif" alt="" />
      <img src="/badges/thin/sennheiser.gif" alt="" />
      <img src="/badges/thin/sonic.gif" alt="" />
      <img src="/badges/thin/fuckgender.png" alt="" />
      <img src="/badges/thin/gentoo.png" alt="" />
      <img src="/badges/thin/retarded.gif" alt="" />
      <img src="/badges/thin/sane0.gif" alt="" />
      <img src="/badges/thin/weird.gif" alt="" />
      <img src="/badges/thin/usepgp.gif" alt="" />
      <img src="/badges/thin/pure.gif" alt="" />
      <img src="/badges/thin/geek.gif" alt="" />
      <img src="/badges/thin/linux100.gif" alt="" />
      <img src="/badges/thin/vim_the_editor.png" alt="" />
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.badgelist,
.thinbadgelist {
  @apply flex gap-2 w-full flex-wrap justify-evenly;

  img {
    @apply transition-all transform ease duration-100;
  }

  img:hover {
    transform: scale(1.1);
  }

  .badgelist img {
    width: 88px;
    height: 31px;
  }
}
</style>
