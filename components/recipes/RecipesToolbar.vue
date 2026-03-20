<template>
  <div class="row mb-4 justify-content-center">
    <div class="col-md-10">
      <div class="d-flex flex-column flex-md-row gap-3">
        <!-- Input de Busca -->
        <div class="input-group input-group-lg shadow-sm flex-grow-1">
          <span class="input-group-text bg-white border-end-0">
            <i class="bi bi-search text-muted"></i>
          </span>
          <input
            :value="modelValue.search"
            @input="updateField('search', ($event.target as HTMLInputElement).value)"
            type="text"
            class="form-control border-start-0 ps-0"
            placeholder="Buscar por nome ou ingrediente..."
          >
        </div>

        <!-- Filtro de Categoria -->
        <div class="input-group input-group-lg shadow-sm" style="max-width: 300px;">
          <span class="input-group-text bg-white border-end-0">
            <i class="bi bi-tag text-muted"></i>
          </span>
          <select
            :value="modelValue.categoryId"
            @change="updateField('categoryId', ($event.target as HTMLSelectElement).value)"
            class="form-select border-start-0 ps-0 text-secondary"
          >
            <option value="">Todas as categorias</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.nome }}
            </option>
          </select>
        </div>

        <!-- Botão Limpar Filtros -->
        <button 
          :disabled="!hasFilters"
          @click="clearFilters" 
          class="btn btn-outline-danger btn-lg shadow-sm px-4 whitespace-nowrap"
          title="Limpar filtros"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCategories } from '~/composables/useCategories'

const props = defineProps<{
  modelValue: {
    search: string
    categoryId: string | number
  }
}>()

const emit = defineEmits<{
  'update:modelValue': [value: typeof props.modelValue]
}>()

const { items: categories, fetchCategories } = useCategories()

onMounted(() => {
  fetchCategories()
})

const hasFilters = computed(() => {
  return props.modelValue.search !== '' || props.modelValue.categoryId !== ''
})

const updateField = (field: 'search' | 'categoryId', value: string) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value
  })
}

const clearFilters = () => {
  emit('update:modelValue', { search: '', categoryId: '' })
}
</script>