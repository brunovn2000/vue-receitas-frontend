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

  create(data: FormData) {
    return api<Recipe>('/recipes/', {
      method: 'POST',
      body: data,
    })
  },

  update(id: number, data: FormData) {
    return api<Recipe>(`/recipes/${id}/`, {
      method: 'PATCH',
      body: data,
    })
  },

  remove(id: number) {
    return api<void>(`/recipes/${id}/`, {
      method: 'DELETE',
    })
  },

  print(id: number) {
    return api<Blob>(`/recipes/${id}/print`, {
      method: 'GET',
      responseType: 'blob',
    })
  },
}