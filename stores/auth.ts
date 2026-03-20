import { defineStore } from 'pinia'
import type { AuthUser, LoginPayload } from '~/types/auth'
import { authService } from '~/services/auth.service'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as AuthUser | null,
    accessToken: null as string | null,
    refreshToken: null as string | null,
  }),

  getters: {
    isAuthenticated: state => !!state.accessToken,
  },

  actions: {
    async login(payload: LoginPayload) {
      const tokens = await authService.login(payload)

      this.accessToken = tokens.access
      this.refreshToken = tokens.refresh

      this.user = await authService.me()
    },

    logout() {
      this.user = null
      this.accessToken = null
      this.refreshToken = null
    },

    async fetchMe() {
      this.user = await authService.me()
    },
  },

  persist: false,
})