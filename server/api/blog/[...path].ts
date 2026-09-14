export default defineEventHandler((event) => {
  const { blogApiBase } = useRuntimeConfig();
  const path = getRouterParam(event, 'path') ?? '';
  const target = `${blogApiBase}/${path}${getRequestURL(event).search}`;

  return proxyRequest(event, target);
});
