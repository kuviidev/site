<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import Button from '~/components/common/Button.vue';
import {
  blogMediaUrl,
  createPost,
  updatePost,
  uploadAttachment,
  addAttachmentByUrl,
  deleteAttachment,
  formatTagsField,
  parseTagsInput,
  type Post,
  type PostInput,
  type PostKind,
  type PostStatus,
  type MediaType,
} from '#imports';

const props = defineProps<{ post: Post | null; token: string }>();
const emit = defineEmits<{ saved: [Post]; cancel: [] }>();

const current = ref<Post | null>(props.post ? { ...props.post } : null);
const form = reactive({
  kind: (props.post?.kind ?? 'long') as PostKind,
  title: props.post?.title ?? '',
  slug: props.post?.slug ?? '',
  body: props.post?.body ?? '',
  tags: formatTagsField(props.post?.tags ?? []),
  status: (props.post?.status ?? 'published') as PostStatus,
});

const bodyRef = ref<HTMLTextAreaElement | null>(null);
const mediaType = ref<MediaType>('image');
const externalUrl = ref('');
const saving = ref(false);
const busyMedia = ref(false);
const message = ref('');
const errorMessage = ref('');

const isLong = computed(() => form.kind === 'long');
const attachments = computed(() => current.value?.attachments ?? []);
const bodyHint = computed(() => (isLong.value ? ', embed media with {{attachment:id}}' : ''));

function flash(text: string): void {
  message.value = text;
  errorMessage.value = '';
}

function fail(err: unknown): void {
  const status = (err as { statusCode?: number; response?: { status?: number } })?.statusCode;
  const httpStatus = status ?? (err as { response?: { status?: number } })?.response?.status;

  switch (httpStatus) {
    case 409: 
      errorMessage.value = 'that slug is already taken by another post.';
      break;
    case 401:
      errorMessage.value = 'your token was rejected. re-enter it.';
      break;
    default:
      (err as Error)?.message || 'something went wrong.';
      break;
  }
    
  message.value = '';
}

async function save(): Promise<void> {
  saving.value = true;
  errorMessage.value = '';

  const input: PostInput = {
    kind: form.kind,
    slug: isLong.value ? form.slug.trim() || null : null,
    title: isLong.value ? form.title.trim() || null : null,
    body: form.body,
    tags: parseTagsInput(form.tags),
    status: form.status,
  };

  try {
    const result = current.value
      ? await updatePost(current.value.id, input, props.token)
      : await createPost(input, props.token);

    current.value = result;

    flash('saved!');
    emit('saved', result);
  } catch (err) {
    fail(err);
  } finally {
    saving.value = false;
  }
}

async function onFileChange(event: Event): Promise<void> {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file || !current.value) return;

  busyMedia.value = true;

  try {
    const attachment = await uploadAttachment(current.value.id, file, mediaType.value, props.token);
    current.value.attachments = [...attachments.value, attachment];
    flash('media uploaded.');
  } catch (err) {
    fail(err);
  } finally {
    busyMedia.value = false;
    input.value = '';
  }
}

async function addUrl(): Promise<void> {
  if (!externalUrl.value.trim() || !current.value) return;

  busyMedia.value = true;

  try {
    const attachment = await addAttachmentByUrl(current.value.id, externalUrl.value.trim(), mediaType.value, props.token);
    current.value.attachments = [...attachments.value, attachment];
    externalUrl.value = '';
    flash('media linked.');
  } catch (err) {
    fail(err);
  } finally {
    busyMedia.value = false;
  }
}

async function removeAttachment(id: number): Promise<void> {
  if (!current.value) return;

  busyMedia.value = true;

  try {
    await deleteAttachment(id, props.token);
    current.value.attachments = attachments.value.filter((item) => item.id !== id);
    flash('media removed.');
  } catch (err) {
    fail(err);
  } finally {
    busyMedia.value = false;
  }
}

function insertMarker(id: number): void {
  const marker = `{{attachment:${id}}}`;
  const el = bodyRef.value;

  if (!el) {
    form.body += `\n${marker}\n`;
    return;
  }

  const start = el.selectionStart;
  const end = el.selectionEnd;
  form.body = `${form.body.slice(0, start)}${marker}${form.body.slice(end)}`;
}
</script>

<template>
  <div class="editor bord flex flex-col gap-3 p-4">
    <div class="flex items-center justify-between gap-2">
      <h2 class="!pt-0">{{ current ? `== editing #${current.id}` : '== new post' }}</h2>
      <Button variant="default" @click="emit('cancel')">close</Button>
    </div>

    <div class="field">
      <span>kind</span>
      <div class="flex flex-wrap gap-2">
        <Button :active="form.kind === 'long'" @click="form.kind = 'long'">long (article)</Button>
        <Button :active="form.kind === 'micro'" @click="form.kind = 'micro'">micro (short post)</Button>
      </div>
    </div>

    <template v-if="isLong">
      <label class="field">
        <span>title</span>
        <input v-model="form.title" type="text" placeholder="my post title" class="control" />
      </label>
      <label class="field">
        <span>slug</span>
        <input v-model="form.slug" type="text" placeholder="my-post-title" class="control" />
        <small class="text-zinc-500">used for the permalink: /blog/&lt;slug&gt;</small>
      </label>
    </template>

    <label class="field">
      <span>body (markdown{{ bodyHint }})</span>
      <textarea ref="bodyRef" v-model="form.body" rows="12" class="control" />
    </label>

    <label class="field">
      <span>tags</span>
      <input v-model="form.tags" type="text" placeholder="#politics #something #boo #far" class="control" />
      <small class="text-zinc-500">space-separated hashtags, stored as post tags</small>
    </label>

    <div class="field">
      <span>status</span>
      <div class="flex flex-wrap gap-2">
        <Button :active="form.status === 'published'" @click="form.status = 'published'">published</Button>
        <Button :active="form.status === 'draft'" @click="form.status = 'draft'">draft</Button>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <Button variant="primary" :disabled="saving" @click="save">
        {{ saving ? 'saving…' : current ? 'save changes' : 'create post' }}
      </Button>
      <span v-if="message" class="text-green-400 text-sm">{{ message }}</span>
      <span v-if="errorMessage" class="text-red-400 text-sm">{{ errorMessage }}</span>
    </div>

    <hr />

    <div class="flex flex-col gap-2">
      <h3 class="!pt-0">=== media</h3>
      <p v-if="!current" class="text-zinc-500">save the post first, then you can attach media.</p>

      <template v-else>
        <div class="flex flex-wrap items-end gap-3">
          <div class="field">
            <span>type</span>
            <div class="flex gap-2">
              <Button variant="mini" :active="mediaType === 'image'" @click="mediaType = 'image'">image</Button>
              <Button variant="mini" :active="mediaType === 'video'" @click="mediaType = 'video'">video</Button>
            </div>
          </div>
          <label class="field">
            <span>upload file</span>
            <input type="file" :disabled="busyMedia" class="control" @change="onFileChange" />
          </label>
        </div>

        <div class="flex flex-wrap items-end gap-2">
          <label class="field grow">
            <span>or link a url</span>
            <input v-model="externalUrl" type="text" placeholder="https://…" class="control" />
          </label>
          <Button variant="default" :disabled="busyMedia" @click="addUrl">link</Button>
        </div>

        <div v-if="attachments.length" class="media-list grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div v-for="attachment in attachments" :key="attachment.id" class="media-item bord flex flex-col gap-1 p-2">
            <video
              v-if="attachment.media_type === 'video'"
              :src="blogMediaUrl(attachment.url)"
              controls
              playsinline
              class="w-full"
            />
            <img v-else :src="blogMediaUrl(attachment.url)" alt="" class="w-full" />
            <div class="flex items-center justify-between gap-2 text-sm">
              <span class="text-zinc-500">#{{ attachment.id }}</span>
              <div class="flex gap-2">
                <Button v-if="isLong" variant="mini" @click="insertMarker(attachment.id)">insert</Button>
                <Button variant="mini" danger :disabled="busyMedia" @click="removeAttachment(attachment.id)">
                  delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.field {
  @apply flex flex-col gap-1;
}

.control {
  @apply border-2 border-solid border-gray bg-zinc-950 text-zinc-400 font-ega text-sm p-2;
}
</style>
