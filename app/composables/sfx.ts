import { ref } from 'vue';

const sounds = {
  tap: '/assets/sfx/tap.wav',
  pluck: '/assets/sfx/pluck.wav',
} as const;

export type SfxName = keyof typeof sounds;

export interface PlaySfxOptions {
  volume?: number;
}

const enabled = ref(true);
const audioCache = new Map<string, HTMLAudioElement>();

function getAudio(url: string): HTMLAudioElement {
  let audio = audioCache.get(url);

  if (!audio) {
    audio = new Audio(url);
    audio.preload = 'auto';
    audioCache.set(url, audio);
  }

  return audio;
}

export function useSfx() {
  function play(name: SfxName, options: PlaySfxOptions = {}): void {
    if (!enabled.value) return;

    const source = getAudio(sounds[name]);

    // overlap handling
    const audio = source.cloneNode() as HTMLAudioElement;

    audio.volume = options.volume ?? 1;
    audio.currentTime = 0;

    // rejection handling
    void audio.play().catch(() => {});
  }

  function setEnabled(value: boolean): void {
    enabled.value = value;
  }

  function toggle(): void {
    enabled.value = !enabled.value;
  }

  return {
    play,
    enabled,
    setEnabled,
    toggle,
  };
}
