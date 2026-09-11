<template>
  <nav class="flex items-center gap-2 bord p-4">
    <NavLink to="/">home</NavLink>
    <p>-</p>
    <NavLink to="/about">about_me</NavLink>
    <p>-</p>
    <NavLink to="/blog" striped>blog</NavLink>
    <p>-</p>
    <NavLink to="/projects">projects</NavLink>
    <p>-</p>
    <NavLink to="/bookmarks">bookmarks</NavLink>
    <div class="ml-auto">
      <!-- todo: add or not -->
      <audio controls loop hidden>
        <source src="/prob_-_come_to_me.mp3" type="audio/mpeg" />
      </audio>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
audio {
  @apply h-4;
}
</style>
