export default defineNuxtPlugin(async () => {
  const auth = useAuthStore()

  if (auth.access_token && !auth.user) {
    await auth.restoreSession()
  }
})
