<script setup lang="ts">
import { ref, computed } from 'vue';
import PostCard from '~/components/blog/PostCard.vue';
import Button from '~/components/common/Button.vue';
import {
  listPosts,
  listTags,
  getPost,
  useSeoMeta,
  useAsyncData,
  useRoute,
  useRouter,
  type Post,
  type PostListItem,
  type PostKind,
} from '#imports';

type FeedPost = PostListItem | Post;

useSeoMeta({
  title: "kuvii's blog",
  ogTitle: "kuvii's blog",
  description: 'ramblings, notes and micro posts by kuvii',
  ogDescription: 'ramblings, notes and micro posts by kuvii',
});

const route = useRoute();
const router = useRouter();

const { data: posts, error } = await useAsyncData<FeedPost[]>('blog-feed', async () => {
  const list = await listPosts({ limit: 100 });

  return Promise.all(
    list.posts.map((post) => (post.kind === 'micro' ? getPost(post.id) : Promise.resolve(post)))
  );
});

const { data: tagCounts } = await useAsyncData('blog-tags', () => listTags(), { default: () => ({ tags: [] }) });

const kindFilter = ref<'all' | PostKind>('all');
const search = ref('');

const activeTag = computed(() => (typeof route.query.tag === 'string' ? route.query.tag.toLowerCase() : ''));

const allTags = computed(() => (tagCounts.value?.tags ?? []).map((entry) => entry.tag).sort());

function searchable(post: FeedPost): string {
  const excerpt = 'excerpt' in post ? post.excerpt : post.body;
  return `${post.title ?? ''} ${excerpt}`.toLowerCase();
}

const filtered = computed(() => {
  const query = search.value.trim().toLowerCase();
  const tag = activeTag.value;

  return (posts.value ?? []).filter((post) => {
    if (kindFilter.value !== 'all' && post.kind !== kindFilter.value) return false;
    if (tag && !post.tags.includes(tag)) return false;
    if (query && !searchable(post).includes(query)) return false;
    return true;
  });
});

function setTag(tag: string): void {
  router.push({ path: '/blog', query: tag ? { tag } : {} });
}

function clearFilters(): void {
  kindFilter.value = 'all';
  search.value = '';
  setTag('');
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <h1>= blog</h1>
      <p>my little corner for longer writeups and short micro posts. newest first :3</p>
    </div>

    <div v-if="posts?.length" class="filters bord flex flex-col gap-3 p-4">
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-zinc-500 text-sm">show</span>
        <Button variant="mini" :active="kindFilter === 'all'" @click="kindFilter = 'all'">all</Button>
        <Button variant="mini" :active="kindFilter === 'long'" @click="kindFilter = 'long'">posts</Button>
        <Button variant="mini" :active="kindFilter === 'micro'" @click="kindFilter = 'micro'">micros</Button>
        <input v-model="search" type="text" placeholder="search…" class="control ml-auto" />
      </div>

      <div v-if="allTags.length" class="flex flex-wrap items-center gap-2">
        <span class="text-zinc-500 text-sm">tags</span>
        <Button
          v-for="tag in allTags"
          :key="tag"
          variant="mini"
          :active="activeTag === tag"
          @click="setTag(activeTag === tag ? '' : tag)"
        >
          #{{ tag }}
        </Button>
      </div>
    </div>

    <div v-if="error" class="bord flex flex-col items-center gap-2 p-8 text-center">
      <Icon size="48" name="pixelarticons:cloud-off" />
      <p>couldn't reach the blog right now. try again later!</p>
    </div>

    <div v-else-if="!posts?.length" class="bord flex flex-col items-center gap-2 p-8 text-center">
      <Icon size="48" name="pixelarticons:coffee" />
      <p>no posts yet. check back soon!</p>
    </div>

    <div v-else-if="!filtered.length" class="bord flex flex-col items-center gap-2 p-8 text-center">
      <Icon size="48" name="pixelarticons:search" />
      <p>no posts match your filters.</p>
      <Button variant="mini" @click="clearFilters">clear filters</Button>
    </div>

    <div v-else class="feed flex flex-col gap-4">
      <PostCard v-for="post in filtered" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.control {
  @apply border-2 border-solid border-gray bg-zinc-950 text-zinc-400 font-ega text-sm p-2;
}
</style>
