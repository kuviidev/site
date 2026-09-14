<script setup lang="ts">
import { onMounted, ref } from 'vue';
import PostEditor from '~/components/blog/PostEditor.vue';
import Button from '~/components/common/Button.vue';
import {
  useSeoMeta,
  useBlogToken,
  listPosts,
  getPost,
  deletePost,
  updatePostStatus,
  formatBlogDate,
  type Post,
  type PostListItem,
} from '#imports';

useSeoMeta({ title: 'blog admin', robots: 'noindex, nofollow' });

const { token, load, set, clear } = useBlogToken();

type AdminPost = PostListItem | Post;

const tokenInput = ref('');
const posts = ref<AdminPost[]>([]);
const loading = ref(false);
const error = ref('');

const showEditor = ref(false);
const editing = ref<Post | null>(null);
const editorKey = ref(0);

async function loadPosts(): Promise<void> {
  loading.value = true;
  error.value = '';
  try {
    const res = await listPosts({ limit: 100 }, token.value);
    posts.value = res.posts;
  } catch {
    error.value = "couldn't load posts. is the blog running?";
  } finally {
    loading.value = false;
  }
}

function login(): void {
  if (!tokenInput.value.trim()) return;
  set(tokenInput.value);
  tokenInput.value = '';
  showEditor.value = false;
  editing.value = null;
  loadPosts();
}

function logout(): void {
  clear();
  posts.value = [];
  showEditor.value = false;
  editing.value = null;
}

function newPost(): void {
  editing.value = null;
  showEditor.value = true;
  editorKey.value += 1;
}

async function edit(post: AdminPost): Promise<void> {
  try {
    editing.value = await getPost(post.id, token.value);
    showEditor.value = true;
    editorKey.value += 1;
  } catch {
    error.value = "couldn't open that post.";
  }
}

function onSaved(post: Post): void {
  const index = posts.value.findIndex((item) => item.id === post.id);
  if (index >= 0) posts.value[index] = post;
  else posts.value.unshift(post);
  editing.value = post;
}

async function toggleStatus(post: AdminPost): Promise<void> {
  const next = post.status === 'published' ? 'draft' : 'published';
  try {
    const updated = await updatePostStatus(post.id, next, token.value);
    const index = posts.value.findIndex((item) => item.id === post.id);
    if (index >= 0) posts.value[index] = updated;
  } catch {
    error.value = "couldn't change status (token rejected?).";
  }
}

async function remove(post: AdminPost): Promise<void> {
  if (!window.confirm(`delete post #${post.id}? this can't be undone.`)) return;
  try {
    await deletePost(post.id, token.value);
    posts.value = posts.value.filter((item) => item.id !== post.id);
    if (editing.value?.id === post.id) showEditor.value = false;
  } catch {
    error.value = "couldn't delete (token rejected?).";
  }
}

function postLabel(post: AdminPost): string {
  if (post.kind === 'long') return post.title || post.slug || '(untitled)';
  const text = 'excerpt' in post ? post.excerpt : post.body;
  return text.slice(0, 60) || '(empty micro post)';
}

onMounted(() => {
  load();
  if (token.value) loadPosts();
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <h1>= blog admin</h1>
      <p>manage your posts, drafts and media here.</p>
    </div>

    <div v-if="!token" class="login bord flex flex-col gap-3 p-4">
      <h2 class="!pt-0">== sign in</h2>
      <p>enter your blog auth token to continue.</p>
      <input
        v-model="tokenInput"
        type="password"
        placeholder="bearer token"
        class="control"
        @keyup.enter="login"
      />
      <Button variant="primary" class="self-start" @click="login">sign in</Button>
    </div>

    <template v-else>
      <div class="flex flex-wrap items-center gap-2">
        <Button variant="primary" icon="pixelarticons:plus" @click="newPost">new post</Button>
        <Button @click="loadPosts">refresh</Button>
        <Button to="/blog">view blog</Button>
        <Button class="ml-auto" @click="logout">log out</Button>
      </div>

      <p v-if="error" class="text-red-400">{{ error }}</p>

      <PostEditor
        v-if="showEditor"
        :key="editorKey"
        :post="editing"
        :token="token"
        @saved="onSaved"
        @cancel="showEditor = false"
      />

      <div class="flex flex-col gap-2">
        <h2>== posts ({{ posts.length }})</h2>
        <p v-if="loading">loading…</p>
        <p v-else-if="!posts.length" class="text-zinc-500">no posts yet. create your first one!</p>

        <div v-else class="flex flex-col gap-2">
          <div
            v-for="post in posts"
            :key="post.id"
            class="row bord flex flex-wrap items-center gap-2 p-3"
          >
            <span class="tag">{{ post.kind }}</span>
            <span :class="['tag', post.status === 'published' ? 'tag-live' : 'tag-draft']">{{ post.status }}</span>
            <span class="grow truncate">{{ postLabel(post) }}</span>
            <time class="text-sm text-zinc-500">{{ formatBlogDate(post.created_at) }}</time>
            <div class="flex gap-2">
              <Button variant="mini" @click="edit(post)">edit</Button>
              <Button variant="mini" @click="toggleStatus(post)">
                {{ post.status === 'published' ? 'unpublish' : 'publish' }}
              </Button>
              <Button variant="mini" danger @click="remove(post)">delete</Button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.control {
  @apply border-2 border-solid border-gray bg-zinc-950 text-zinc-400 font-ega text-sm p-2 self-start min-w-[280px];
}

.tag {
  @apply px-2 py-1 text-xs bg-zinc-700 text-zinc-300;
}

.tag-live {
  @apply bg-green-900 text-green-300;
}

.tag-draft {
  @apply bg-yellow-900 text-yellow-300;
}
</style>
