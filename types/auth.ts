export interface LoginPayload {
  login: string
  senha: string
}

export interface AuthTokens {
  access_token: string
  refresh_token: string
}

export interface AuthUser {
  id: number
  nome: string
  login: string
}

export interface RegisterPayload {
  nome: string
  login: string
  senha: string
}