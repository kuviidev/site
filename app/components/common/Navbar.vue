<script setup lang="ts">
import SfxToggle from './SfxToggle.vue';
import AudioPlayer from './AudioPlayer.vue';
</script>

<template>
  <nav class="flex flex-col gap-4 bord p-4">
    <pre>
▄▄                 ▀▀  ▀▀                    
██ ▄█▀ ██ ██ ██ ██ ██  ██     ███▄███▄ ▄█▀█▄ 
████   ██ ██ ██▄██ ██  ██     ██ ██ ██ ██▄█▀ 
██ ▀█▄ ▀██▀█  ▀█▀  ██▄ ██▄ ██ ██ ██ ██ ▀█▄▄▄ 
</pre>
    <span class="flex items-center gap-2 flex-wrap">
      <NavLink to="/">home</NavLink>
      <p>-</p>
      <NavLink to="/about">about_me</NavLink>
      <p>-</p>
      <NavLink to="/blog" striped>blog</NavLink>
      <p>-</p>
      <NavLink to="/projects">projects</NavLink>
      <p>-</p>
      <NavLink to="/bookmarks">bookmarks</NavLink>
      <div class="lg:ml-auto flex items-center gap-3">
        <SfxToggle />
        <AudioPlayer />
      </div>
    </span>
  </nav>
</template>
