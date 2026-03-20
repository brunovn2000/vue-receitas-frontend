<template>
  <form @submit.prevent="handleSubmit" class="needs-validation">
    <div v-if="error" class="alert alert-danger mb-4">
      {{ error }}
    </div>

    <div class="row g-3">
      <!-- Imagem da Receita -->
      <div class="col-12 mb-3">
        <label class="form-label fw-bold">Imagem da Receita</label>
        
        <div v-if="previewUrl" class="mb-3 position-relative d-inline-block">
          <img :src="previewUrl" alt="Preview da imagem" class="img-thumbnail" style="max-height: 250px; object-fit: cover;">
          <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 m-2" @click="clearImage" aria-label="Remover imagem">
            X
          </button>
        </div>
        <div v-else-if="currentImage" class="mb-3 position-relative d-inline-block">
          <img :src="currentImage" alt="Imagem atual" class="img-thumbnail" style="max-height: 250px; object-fit: cover;">
          <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 m-2" @click="clearCurrentImage" aria-label="Remover imagem atual">
            X
          </button>
        </div>
        
        <input 
          type="file" 
          class="form-control" 
          id="imagem" 
          accept="image/*" 
          @change="onFileChange"
          ref="fileInput"
        >
        <div class="form-text">Formatos suportados: JPG, PNG, WEBP.</div>
      </div>

      <!-- Nome -->
      <div class="col-md-8">
        <label for="nome" class="form-label fw-bold">Nome da Receita *</label>
        <input 
          type="text" 
          class="form-control" 
          id="nome" 
          v-model="form.nome" 
          required 
          placeholder="Ex: Bolo de Cenoura"
        >
      </div>

      <!-- Categoria -->
      <div class="col-md-4">
        <label for="categoria" class="form-label fw-bold">Categoria *</label>
        <select 
          class="form-select" 
          id="categoria" 
          v-model="form.categoryId" 
          required
          :disabled="pendingCategories"
        >
          <option value="" disabled selected>Selecione uma categoria...</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.nome }}
          </option>
        </select>
      </div>

      <!-- Tempo de Preparo -->
      <div class="col-md-6">
        <label for="tempoPreparoMinutos" class="form-label fw-bold">Tempo de Preparo (Minutos) *</label>
        <input 
          type="number" 
          class="form-control" 
          id="tempoPreparoMinutos" 
          v-model.number="form.tempoPreparoMinutos" 
          required 
          min="1"
          placeholder="Ex: 45"
        >
      </div>

      <!-- Porções -->
      <div class="col-md-6">
        <label for="porcoes" class="form-label fw-bold">Rendimento (Porções) *</label>
        <input 
          type="number" 
          class="form-control" 
          id="porcoes" 
          v-model.number="form.porcoes" 
          required 
          min="1"
          placeholder="Ex: 8"
        >
      </div>

      <!-- Ingredientes -->
      <div class="col-12">
        <label for="ingredientes" class="form-label fw-bold">Ingredientes *</label>
        <textarea 
          class="form-control" 
          id="ingredientes" 
          rows="4" 
          v-model="form.ingredientes" 
          required
          placeholder="Lista de ingredientes separados por vírgula ou um por linha"
        ></textarea>
      </div>

      <!-- Modo de Preparo -->
      <div class="col-12">
        <label for="modoPreparo" class="form-label fw-bold">Modo de Preparo *</label>
        <textarea 
          class="form-control" 
          id="modoPreparo" 
          rows="6" 
          v-model="form.modoPreparo" 
          required
          placeholder="Passo a passo de como preparar a receita"
        ></textarea>
      </div>

      <!-- Ações -->
      <div class="col-12 mt-4 d-flex justify-content-end gap-2">
        <NuxtLink to="/receitas" class="btn btn-secondary">
          Cancelar
        </NuxtLink>
        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
          <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          {{ isEdit ? 'Salvar Alterações' : 'Criar Receita' }}
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { Recipe } from '~/types/recipe'
import { useCategories } from '~/composables/useCategories'

const props = defineProps<{
  initialData?: Recipe | null
  isSubmitting?: boolean
  error?: string
}>()

const emit = defineEmits<{
  (e: 'submit', data: FormData): void
}>()

const { items: categories, pending: pendingCategories, fetchCategories } = useCategories()

const form = ref({
  categoryId: '' as string | number,
  nome: '',
  tempoPreparoMinutos: '',
  porcoes: '',
  modoPreparo: '',
  ingredientes: ''
})

const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const previewUrl = ref<string | null>(null)
const currentImage = ref<string | null>(null)
const removeImage = ref(false)

const isEdit = computed(() => !!props.initialData)

// Initialize form if editing
watch(() => props.initialData, (newVal) => {
  if (newVal) {
    form.value = {
      categoryId: newVal.categoria?.id || '',
      nome: newVal.nome,
      tempoPreparoMinutos: newVal.tempoPreparoMinutos.toString(),
      porcoes: newVal.porcoes.toString(),
      modoPreparo: newVal.modoPreparo,
      ingredientes: newVal.ingredientes
    }
    currentImage.value = newVal.imagem || null
  }
}, { immediate: true })

onMounted(() => {
  fetchCategories()
})

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    if (file) {
      selectedFile.value = file
      previewUrl.value = URL.createObjectURL(file)
      removeImage.value = false
    }
  }
}

const clearImage = () => {
  selectedFile.value = null
  previewUrl.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const clearCurrentImage = () => {
  currentImage.value = null
  removeImage.value = true
}

const handleSubmit = () => {
  const formData = new FormData()
  
  formData.append('categoryId', form.value.categoryId.toString())
  formData.append('nome', form.value.nome)
  formData.append('tempoPreparoMinutos', form.value.tempoPreparoMinutos.toString())
  formData.append('porcoes', form.value.porcoes.toString())
  formData.append('modoPreparo', form.value.modoPreparo)
  formData.append('ingredientes', form.value.ingredientes)
  
  if (selectedFile.value) {
    formData.append('imagem', selectedFile.value)
  }
  
  // O backend pode precisar processar a remoção de imagem existente,
  // Opcional: enviar um campo para indicar a remoção, ex: removeImage: true
  
  emit('submit', formData)
}

onUnmounted(() => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
})
</script>
