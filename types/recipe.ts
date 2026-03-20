export interface Recipe {
  id: number
  nome: string
  usuario?: {
    id: number
    nome: string
    login: string
  } | null | undefined
  categoria?: {
    id: number
    nome: string
  } | null
  tempoPreparoMinutos: number
  porcoes: number
  modoPreparo: string
  ingredientes: string
  criadoEm: string
  alteradoEm: string
  imagem?: string | null
}

