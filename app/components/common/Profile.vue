<template>
  <div
    class="pfp flex p-4 gap-2 max-lg:gap-2 lg:gap-4 max-lg:flex-col-reverse justify-center max-lg:justify-center lg:justify-evenly"
  >
    <div class="flex flex-col justify-center">
      <span class="inline-block text-xl text-blue-400 max-lg:text-center">
        kuvii
        <span class="inline-block w-2 h-2 aspect-square bg-yellow rounded-full"></span>
      </span>
      <span class="text-yellow max-lg:text-center">probably online</span>
    </div>
    <img src="/pfp/new_cropped.jpg" alt="kuvii" class="max-lg:h-[64px] lg:h-[128px]" />
  </div>
</template>

<style lang="scss" scoped>
.pfp {
  $alpha: 0.7;
  background: linear-gradient(rgba(#000, $alpha), rgba(#000, $alpha)), url(/pfp/new_cropped.jpg);
}
</style>
