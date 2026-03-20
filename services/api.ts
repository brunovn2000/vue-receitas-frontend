export const api = async <T>(path: string, options: any = {}): Promise<T> => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  return await $fetch<T>(path, {
    baseURL: config.public.apiBase,
    headers: authStore.accessToken
      ? {
          Authorization: `Bearer ${authStore.accessToken}`,
        }
      : undefined,
    ...options,
  })
}