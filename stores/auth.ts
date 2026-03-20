import { defineStore } from 'pinia'
import type { AuthUser, LoginPayload } from '~/types/auth'
import { authService } from '~/services/auth.service'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as AuthUser | null,
    access_token: null as string | null,
    isRestoringSession: false,
  }),

  getters: {
    isAuthenticated: state => !!state.access_token,
  },

  actions: {
    async login(payload: LoginPayload) {
      const tokens = await authService.login(payload)
      this.access_token = tokens.access_token
      this.user = await authService.me()
    },

    logout() {
      this.user = null
      this.access_token = null
    },

    async fetchMe() {
      this.user = await authService.me()
    },

    async restoreSession() {
      if (!this.access_token) return

      this.isRestoringSession = true
      try {
        this.user = await authService.me()
      } catch {
        // Token inválido/expirado — limpa a sessão
        this.logout()
      } finally {
        this.isRestoringSession = false
      }
    },
  },

  persist: {
    pick: ['access_token'],
  },
})