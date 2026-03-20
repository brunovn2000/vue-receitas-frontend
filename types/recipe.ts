export interface Recipe {
  id: number
  nome: string
  usuario?: {
    id: number
    nome: string
    login: string
  } | null | undefined
  tempoPreparoMinutos: number
  porcoes: number
  modoPreparo: string
  ingredientes: string
  criadoEm: string
  alteradoEm: string
  imagem?: string | null
}

