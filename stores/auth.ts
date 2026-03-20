import { defineStore } from 'pinia'
import type { AuthUser, LoginPayload } from '~/types/auth'
import { authService } from '~/services/auth.service'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as AuthUser | null,
    access_token: null as string | null,
    refresh_token: null as string | null,
  }),

  getters: {
    isAuthenticated: state => !!state.access_token,
  },

  actions: {
    async login(payload: LoginPayload) {
      const tokens = await authService.login(payload)

      this.access_token = tokens.access_token
      this.refresh_token = tokens.refresh_token

      this.user = await authService.me()
    },

    logout() {
      this.user = null
      this.access_token = null
      this.refresh_token = null
    },

    async fetchMe() {
      this.user = await authService.me()
    },
  },

  persist: false,
})