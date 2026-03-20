export const useAuth = () => {
  const store = useAuthStore()
  return {
    user: computed(() => store.user),
    isAuthenticated: computed(() => store.isAuthenticated),
    login: store.login,
    logout: store.logout,
    fetchMe: store.fetchMe,
  }
}