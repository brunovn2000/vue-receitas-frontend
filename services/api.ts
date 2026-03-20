export const api = async <T>(path: string, options: any = {}): Promise<T> => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  // No SSR, usa a URL completa (config.apiBase privada).
  // No client-side, usa o path relativo que passa pelo proxy do Nitro.
  const baseURL = import.meta.server
    ? config.apiBase
    : config.public.apiBase

  return await $fetch<T>(path, {
    baseURL,
    headers: authStore.access_token
      ? { Authorization: `Bearer ${authStore.access_token}` }
      : undefined,
    ...options,
  })
}