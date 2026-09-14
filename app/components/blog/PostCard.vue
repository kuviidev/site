<script setup lang="ts">
import { computed } from 'vue';
import Button from '~/components/common/Button.vue';
import { useRouter, formatBlogDate, renderPostBody, blogMediaUrl, type Post, type PostListItem } from '#imports';

const props = defineProps<{ post: PostListItem | Post }>();
const router = useRouter();

function goToTag(tag: string): void {
  router.push({ path: '/blog', query: { tag } });
}

const isLong = computed(() => props.post.kind === 'long');
const permalink = computed(() => (props.post.slug ? `/blog/${props.post.slug}` : null));
// const excerpt = computed(() => ('excerpt' in props.post ? props.post.excerpt : props.post.body));
const microBody = computed(() =>
  'body' in props.post ? renderPostBody(props.post.body, props.post.attachments ?? []) : ''
);

function onContentClick(event: MouseEvent): void {
  const link = (event.target as HTMLElement).closest('a.hashtag') as HTMLAnchorElement | null;
  if (!link) return;
  event.preventDefault();
  const tag = new URL(link.href).searchParams.get('tag');
  if (tag) router.push({ path: '/blog', query: { tag } });
}
</script>

<template>
  <article class="post bord flex flex-col gap-2 p-4">
    <div class="flex items-center justify-between gap-2 text-sm text-zinc-500">
      <span class="flex items-center gap-1">
        <Icon :name="isLong ? 'pixelarticons:article' : 'pixelarticons:message'" />
        {{ isLong ? 'post' : 'micro' }}
      </span>
      <time>{{ formatBlogDate(post.created_at) }}</time>
    </div>

    <template v-if="isLong">
      <h2 class="!pt-0">
        <Button v-if="permalink" variant="text" :to="permalink">{{ post.title || 'untitled' }}</Button>
        <span v-else>{{ post.title || 'untitled' }}</span>
      </h2>
      <!-- 
      <p class="text-justify">{{ excerpt }}</p>
      -->
    </template>

    <template v-else>
      <div class="micro-body flex flex-col gap-2" @click="onContentClick" v-html="microBody" />
      <div v-if="post.attachments?.length" class="media grid grid-cols-2 md:grid-cols-4 gap-2">
        <template v-for="attachment in post.attachments" :key="attachment.id">
          <video
            v-if="attachment.media_type === 'video'"
            :src="blogMediaUrl(attachment.url)"
            controls
            playsinline
            class="w-full bord"
          />
          <img v-else :src="blogMediaUrl(attachment.url)" alt="" loading="lazy" class="w-full h-full bord object-cover" />
        </template>
      </div>
    </template>

    <div v-if="post.tags.length" class="tags flex flex-wrap gap-2">
      <button
        v-for="tag in post.tags"
        :key="tag"
        type="button"
        class="tag-chip"
        @click="goToTag(tag)"
      >
        #{{ tag }}
      </button>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.micro-body :deep(img),
.micro-body :deep(video) {
  @apply w-full bord;
}

.micro-body :deep(a) {
  @apply text-purple-400;
}

.tag-chip {
  @apply text-sm text-purple-400 hover:text-purple-300;
}
</style>
