<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useSfx } from '#imports';

const { play } = useSfx();

const audioEl = ref<HTMLAudioElement | null>(null);
const playing = ref(false);
const progress = ref(0);
const volume = ref(0.5);

let animFrame = 0;

function updateProgress() {
  const el = audioEl.value;
  if (el && el.duration) {
    progress.value = (el.currentTime / el.duration) * 100;
  }
  animFrame = requestAnimationFrame(updateProgress);
}

onMounted(() => {
  const el = audioEl.value;
  if (el) {
    el.volume = volume.value;
    el.addEventListener('play', () => (playing.value = true));
    el.addEventListener('pause', () => (playing.value = false));
    el.addEventListener('ended', () => (playing.value = false));
    animFrame = requestAnimationFrame(updateProgress);
  }
});

onUnmounted(() => {
  cancelAnimationFrame(animFrame);
});

function togglePlay() {
  play('tap');
  const el = audioEl.value;
  if (!el) return;
  if (el.paused) {
    el.play().catch(() => {});
  } else {
    el.pause();
  }
}

function onVolume(e: Event) {
  const val = Number((e.target as HTMLInputElement).value);
  volume.value = val;
  if (audioEl.value) audioEl.value.volume = val;
}
</script>

<template>
  <div class="player">
    <audio ref="audioEl" loop preload="auto">
      <source src="/assets/audio/bgm.mp3" type="audio/mpeg" />
    </audio>

    <button class="btn" :title="playing ? 'pause' : 'play'" @click="togglePlay">
      <Icon :name="playing ? 'pixelarticons:pause' : 'pixelarticons:play'" size="16" />
    </button>

    <div class="bar-wrap">
      <div class="bar">
        <div class="bar-fill" :style="{ width: progress + '%' }"></div>
      </div>
    </div>

    <div class="vol">
      <Icon name="pixelarticons:volume-2" size="14" />
      <input type="range" min="0" max="1" step="0.05" :value="volume" class="vol-slider" @input="onVolume" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.player {
  @apply flex flex-wrap items-center gap-2;
}

.btn {
  @apply border-2 border-solid border-gray bg-zinc-700 text-gray p-1 flex items-center justify-center
         hover:bg-zinc-600 active:scale-90 transition-all cursor-pointer;
  width: 28px;
  height: 28px;
}

.bar-wrap {
  @apply flex-1;
  min-width: 80px;
}

.bar {
  @apply h-2 bg-zinc-800 border border-gray overflow-hidden;
}

.bar-fill {
  @apply h-full bg-gray;
  transition: width 0.1s linear;
}

.vol {
  @apply flex items-center gap-1 text-gray;
}

.vol-slider {
  @apply appearance-none bg-zinc-800 border border-gray h-1 cursor-pointer;

  &::-webkit-slider-thumb {
    @apply appearance-none bg-gray w-2 h-3 cursor-pointer;
  }

  &::-moz-range-thumb {
    @apply bg-gray w-2 h-3 border-0 cursor-pointer;
    border-radius: 0;
  }
}
</style>
