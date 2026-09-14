import type { Post } from '~/composables/blog';

export default defineEventHandler(async (event): Promise<Post> => {
  const { blogApiBase } = useRuntimeConfig();
  const slug = getRouterParam(event, 'slug');

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'missing slug' });
  }

  try {
    return await $fetch<Post>(`${blogApiBase}/posts/slug/${encodeURIComponent(slug)}`);
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'post not found' });
  }
});
