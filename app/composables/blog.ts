import { Marked } from 'marked';

export type PostKind = 'long' | 'micro';
export type PostStatus = 'draft' | 'published';
export type MediaType = 'image' | 'video';

export interface Attachment {
  id: number;
  post_id: number;
  url: string;
  media_type: MediaType;
  created_at: number;
}

interface PostBase {
  id: number;
  kind: PostKind;
  slug: string | null;
  title: string | null;
  status: PostStatus;
  created_at: number;
  updated_at: number;
  word_count: number;
  tags: string[];
  attachments: Attachment[];
}

// GET /posts/:id and /posts/slug/:slug return the full body.
export interface Post extends PostBase {
  body: string;
}

// GET /posts omits body and returns a server-truncated excerpt instead.
export interface PostListItem extends PostBase {
  excerpt: string;
}

export interface PostListResponse {
  posts: PostListItem[];
  total: number;
  limit: number;
  offset: number;
}

export interface ListPostsQuery {
  limit?: number;
  offset?: number;
  kind?: PostKind;
  status?: PostStatus;
  tag?: string;
  q?: string;
}

export interface TagCount {
  tag: string;
  count: number;
}

export interface TagsResponse {
  tags: TagCount[];
}

export interface PostInput {
  kind: PostKind;
  slug?: string | null;
  title?: string | null;
  body?: string;
  status?: PostStatus;
  tags?: string[];
}

const API = '/api/blog';
const TOKEN_KEY = 'kuvii-blog-token';

const HEX_COLOR = /^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$|^[0-9a-fA-F]{8}$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const markdown = new Marked({ gfm: true, breaks: true }).use({
  extensions: [
    {
      name: 'hashtag',
      level: 'inline',
      start(src: string) {
        const index = src.search(/(^|[^\p{L}\p{N}_/#])#[\p{L}_]/u);
        return index < 0 ? undefined : index;
      },
      tokenizer(src: string) {
        const match = /^#([\p{L}_][\p{L}\p{N}_-]*)/u.exec(src);
        const word = match?.[1];
        if (!match || !word || HEX_COLOR.test(word)) return undefined;
        return { type: 'hashtag', raw: match[0], tag: word };
      },
      renderer(token) {
        const tag = token.tag as string;
        return `<a href="/blog?tag=${encodeURIComponent(tag.toLowerCase())}" class="hashtag">#${escapeHtml(tag)}</a>`;
      },
    },
  ],
});

const TAG_TOKEN = /^[\p{L}_][\p{L}\p{N}_-]*$/u;

export function parseTagsInput(input: string): string[] {
  const tags = new Set<string>();
  for (const raw of input.split(/[\s,]+/)) {
    const cleaned = raw.replace(/^#+/, '').trim().toLowerCase();
    if (TAG_TOKEN.test(cleaned)) tags.add(cleaned);
  }
  return [...tags];
}

export function formatTagsField(tags: string[]): string {
  return tags.map((tag) => `#${tag}`).join(' ');
}

export function blogMediaUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith('/uploads/')) return `${API}${url}`;
  return url;
}

export function formatBlogDate(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function renderPostBody(body: string, attachments: Attachment[] = []): string {
  const withMedia = body.replace(/\{\{attachment:(\d+)\}\}/g, (_match, rawId: string) => {
    const attachment = attachments.find((item) => item.id === Number(rawId));
    if (!attachment) return '';

    const src = blogMediaUrl(attachment.url);
    return attachment.media_type === 'video'
      ? `<video src="${src}" controls playsinline class="blog-media"></video>`
      : `<img src="${src}" alt="" loading="lazy" class="blog-media" />`;
  });

  return markdown.parse(withMedia, { async: false });
}

export function useBlogToken() {
  const token = useState<string>('blog-admin-token', () => '');

  function load(): void {
    if (import.meta.client) {
      token.value = localStorage.getItem(TOKEN_KEY) ?? '';
    }
  }

  function set(value: string): void {
    token.value = value.trim();
    if (import.meta.client) localStorage.setItem(TOKEN_KEY, token.value);
  }

  function clear(): void {
    token.value = '';
    if (import.meta.client) localStorage.removeItem(TOKEN_KEY);
  }

  return { token, load, set, clear };
}

function authHeaders(token: string): Record<string, string> {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function listPosts(query: ListPostsQuery = {}, token = ''): Promise<PostListResponse> {
  return $fetch<PostListResponse>(`${API}/posts`, { query, headers: authHeaders(token) });
}

export function listTags(token = ''): Promise<TagsResponse> {
  return $fetch<TagsResponse>(`${API}/tags`, { headers: authHeaders(token) });
}

export function getPost(id: number, token = ''): Promise<Post> {
  return $fetch<Post>(`${API}/posts/${id}`, { headers: authHeaders(token) });
}

export function createPost(input: PostInput, token: string): Promise<Post> {
  return $fetch<Post>(`${API}/posts`, { method: 'POST', headers: authHeaders(token), body: input });
}

export function updatePost(id: number, input: PostInput, token: string): Promise<Post> {
  return $fetch<Post>(`${API}/posts/${id}`, { method: 'PUT', headers: authHeaders(token), body: input });
}

export function updatePostStatus(id: number, status: PostStatus, token: string): Promise<Post> {
  return $fetch<Post>(`${API}/posts/${id}/status`, { method: 'PATCH', headers: authHeaders(token), body: { status } });
}

export function deletePost(id: number, token: string) {
  return $fetch(`${API}/posts/${id}`, { method: 'DELETE', headers: authHeaders(token) });
}

export function addAttachmentByUrl(postId: number, url: string, mediaType: MediaType, token: string): Promise<Attachment> {
  return $fetch<Attachment>(`${API}/posts/${postId}/attachments`, {
    method: 'POST',
    headers: authHeaders(token),
    body: { url, media_type: mediaType },
  });
}

export function uploadAttachment(postId: number, file: File, mediaType: MediaType, token: string): Promise<Attachment> {
  const form = new FormData();
  form.append('file', file);
  form.append('media_type', mediaType);

  return $fetch<Attachment>(`${API}/posts/${postId}/attachments`, {
    method: 'POST',
    headers: authHeaders(token),
    body: form,
  });
}

export function deleteAttachment(id: number, token: string) {
  return $fetch(`${API}/attachments/${id}`, { method: 'DELETE', headers: authHeaders(token) });
}
