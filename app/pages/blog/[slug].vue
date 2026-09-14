<script setup lang="ts">
import { computed } from 'vue';
import Button from '~/components/common/Button.vue';
import { useRoute, useRouter, useFetch, useSeoMeta, formatBlogDate, renderPostBody, type Post } from '#imports';

const route = useRoute();
const router = useRouter();

const slug = computed(() => String(route.params.slug));

const { data: post, error } = await useFetch<Post>(() => `/api/blog-post/${slug.value}`);

const rendered = computed(() => (post.value ? renderPostBody(post.value.body, post.value.attachments ?? []) : ''));

function onContentClick(event: MouseEvent): void {
  const link = (event.target as HTMLElement).closest('a.hashtag') as HTMLAnchorElement | null;
  if (!link) return;
  event.preventDefault();
  const tag = new URL(link.href).searchParams.get('tag');
  if (tag) router.push({ path: '/blog', query: { tag } });
}

useSeoMeta({
  title: () => (post.value?.title ? `${post.value.title} — kuvii's blog` : "kuvii's blog"),
  ogTitle: () => (post.value?.title ? `${post.value.title} — kuvii's blog` : "kuvii's blog"),
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <Button variant="text" to="/blog" class="self-start">&lt- back to blog</Button>

    <div v-if="error || !post" class="bord flex flex-col items-center gap-2 p-8 text-center">
      <Icon size="48" name="pixelarticons:file-alert" />
      <span class="text-xl">post not found</span>
      <p>this post doesn't exist or isn't published (yet).</p>
    </div>

    <article v-else class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <h1 class="!pt-0">= {{ post.title || 'untitled' }}</h1>
        <time class="text-sm text-zinc-500">{{ formatBlogDate(post.created_at) }}</time>
      </div>
      <hr />
      <div class="post-content flex flex-col gap-2" @click="onContentClick" v-html="rendered" />
    </article>
  </div>
</template>

<style lang="scss" scoped>
.post-content :deep(.blog-media) {
  @apply w-full bord my-2;
}

.post-content :deep(img),
.post-content :deep(video) {
  @apply max-w-full;
}

.post-content :deep(pre) {
  @apply bord bg-zinc-950 p-2 overflow-auto text-sm;
}

.post-content :deep(code) {
  @apply text-zinc-300;
}

.post-content :deep(blockquote) {
  @apply border-l-2 border-gray pl-4 text-zinc-500;
}

.post-content :deep(ul),
.post-content :deep(ol) {
  @apply flex flex-col gap-1;
}
</style>
