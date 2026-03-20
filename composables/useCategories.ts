import { ref } from 'vue'
import type { Category } from '~/types/category'
import { categoriesService } from '~/services/categories.service'

export const useCategories = () => {
  const items = ref<Category[]>([])
  const pending = ref(false)
  const error = ref<any>(null)

  const fetchCategories = async () => {
    pending.value = true
    error.value = null
    try {
      const response = await categoriesService.list()
      items.value = response
    } catch (e: any) {
      error.value = e
    } finally {
      pending.value = false
    }
  }

  return {
    items,
    pending,
    error,
    fetchCategories,
  }
}
