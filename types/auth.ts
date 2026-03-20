export interface LoginPayload {
  login: string
  senha: string
}

export interface AuthTokens {
  access: string
  refresh: string
}

export interface AuthUser {
  id: number
  nome: string
  login: string
}