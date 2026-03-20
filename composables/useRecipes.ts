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

  const createRecipe = async (data: FormData) => {
    pending.value = true
    error.value = ''
    try {
      return await recipesService.create(data)
    } catch (e: any) {
      error.value = 'Erro ao criar receita.'
      throw e
    } finally {
      pending.value = false
    }
  }

  const updateRecipe = async (id: number, data: FormData) => {
    pending.value = true
    error.value = ''
    try {
      return await recipesService.update(id, data)
    } catch (e: any) {
      error.value = 'Erro ao atualizar receita.'
      throw e
    } finally {
      pending.value = false
    }
  }

  const deleteRecipe = async (id: number) => {
    pending.value = true
    error.value = ''
    try {
      await recipesService.remove(id)
    } catch (e: any) {
      error.value = 'Erro ao remover receita.'
      throw e
    } finally {
      pending.value = false
    }
  }

  const printRecipe = async (id: number) => {
    pending.value = true
    error.value = ''
    try {
      const blob = await recipesService.print(id)
      const url = window.URL.createObjectURL(blob)
      window.open(url, '_blank')
      
      // Revoke the object URL after a short delay
      setTimeout(() => {
        window.URL.revokeObjectURL(url)
      }, 1000)
    } catch (e: any) {
      error.value = 'Erro ao imprimir receita.'
      throw e
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
    createRecipe,
    updateRecipe,
    deleteRecipe,
    printRecipe,
  }
}