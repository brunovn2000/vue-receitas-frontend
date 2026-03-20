import type { Recipe } from '~/types/recipe'
import { api } from './api'

export const recipesService = {
  list(params?: Record<string, any>) {
    return api<Recipe[]>('/recipes/', {
      method: 'GET',
      query: params,
    })
  },

  getById(id: number) {
    return api<Recipe>(`/recipes/${id}/`, {
      method: 'GET',
    })
  },
}