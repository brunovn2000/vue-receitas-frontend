import type { Category } from '~/types/category'
import { api } from './api'

export const categoriesService = {
  list() {
    return api<Category[]>('/categories/', {
      method: 'GET',
    })
  },
}
