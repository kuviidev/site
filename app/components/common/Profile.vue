<template>
  <div class="pfpbg flex gap-4 justify-evenly">
    <div class="flex flex-col justify-center">
      <span class="text-blue-400 text-xl">
        kuvii
        <span class="h-2 w-2 aspect-square inline-block bg-yellow rounded-full"></span>
      </span>
      <span class="text-yellow">probably online</span>
    </div>
    <img src="/pfp/new_cropped.jpg" alt="<insert pfp here>" height="128" />
  </div>
</template>

<style lang="scss" scoped>
.pfpbg {
  $alpha: 0.7;
  background:
    linear-gradient(rgba($color: #000000, $alpha: $alpha), rgba($color: #000000, $alpha: $alpha)),
    url(/pfp/new_cropped.jpg);
}
</style>
