import type { AuthTokens, LoginPayload, AuthUser, RegisterPayload } from '~/types/auth'
import { api } from './api'

export const authService = {
  login(payload: LoginPayload) {
    return api<AuthTokens>('/auth/login/', {
      method: 'POST',
      body: payload,
    })
  },

  register(payload: RegisterPayload) {
    return api<AuthUser>('/users/', {
      method: 'POST',
      body: payload,
    })
  },

  refresh(refresh: string) {
    return api<{ access: string }>('/auth/refresh/', {
      method: 'POST',
      body: { refresh },
    })
  },

  me() {
    return api<AuthUser>('/auth/me/', {
      method: 'GET',
    })
  },
}