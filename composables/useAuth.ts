export const useAuth = () => {
  const store = useAuthStore()
  return {
    user: computed(() => store.user),
    isAuthenticated: computed(() => store.isAuthenticated),
    isRestoringSession: computed(() => store.isRestoringSession),
    login: store.login,
    logout: store.logout,
    fetchMe: store.fetchMe,
  }
}