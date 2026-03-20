import type { Recipe } from '~/types/recipe'
import { recipesService } from '~/services/recipes.service'

export const useRecipes = () => {
  const items = ref<Recipe[]>([])
  const item = ref<Recipe | null>(null)
  const pending = ref(false)
  const error = ref<string>('')

  const fetchRecipes = async (params?: Record<string, any>) => {
    pending.value = true
    error.value = ''

    try {
      items.value = await recipesService.list(params)
    } catch {
      error.value = 'Erro ao carregar receitas.'
    } finally {
      pending.value = false
    }
  }

  const fetchRecipeById = async (id: number) => {
    pending.value = true
    error.value = ''

    try {
      item.value = await recipesService.getById(id)
    } catch {
      error.value = 'Erro ao carregar receita.'
    } finally {
      pending.value = false
    }
  }

  return {
    items,
    item,
    pending,
    error,
    fetchRecipes,
    fetchRecipeById,
  }
}