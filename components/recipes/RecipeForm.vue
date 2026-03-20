<template>
  <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
    <div class="card-header bg-white border-0 py-3 d-flex align-items-center justify-content-between">
      <h5 class="card-title mb-0 d-flex align-items-center">
        <i class="bi bi-pencil-square me-2 text-primary"></i>
        {{ isEdit ? 'Editar Receita' : 'Nova Receita' }}
      </h5>
      <button type="button" @click="goBack" class="btn btn-link text-secondary text-decoration-none btn-sm d-flex align-items-center">
        <i class="bi bi-arrow-left me-1"></i>
        Voltar
      </button>
    </div>
    
    <div class="card-body p-4">
      <form @submit.prevent="handleSubmit" class="needs-validation">
        <div v-if="error" class="alert alert-danger mb-4 d-flex align-items-center">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          {{ error }}
        </div>

        <div class="row g-4">
          <!-- Lado Esquerdo: Imagem -->
          <div class="col-lg-5 col-xl-4">
            <div class="mb-3">
              <label class="form-label fw-bold d-block mb-3">
                <i class="bi bi-image me-1"></i> Foto da Receita
              </label>
              
              <div class="image-upload-container position-relative rounded-4 overflow-hidden bg-light border d-flex align-items-center justify-content-center mb-3" style="aspect-ratio: 4/3; cursor: pointer;" @click="triggerFileInput">
                <div v-if="previewUrl || currentImage" class="w-100 h-100">
                  <img :src="(previewUrl || currentImage)!" alt="Preview" class="w-100 h-100" style="object-fit: cover;">
                  <div class="position-absolute top-0 end-0 m-2">
                    <button type="button" class="btn btn-sm btn-danger rounded-circle shadow" @click.stop="previewUrl ? clearImage() : clearCurrentImage()" aria-label="Remover imagem">
                      <i class="bi bi-x"></i>
                    </button>
                  </div>
                  <div class="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-50 text-white p-2 text-center small">
                    Clique para alterar a foto
                  </div>
                </div>
                <div v-else class="text-center text-muted p-4">
                  <i class="bi bi-cloud-arrow-up fs-1 mb-2"></i>
                  <p class="mb-0">Clique ou arraste a foto aqui</p>
                  <span class="small opacity-75">PNG, JPG ou WEBP</span>
                </div>
              </div>
              
              <input 
                type="file" 
                class="d-none" 
                id="imagem" 
                accept="image/*" 
                @change="onFileChange"
                ref="fileInput"
              >
            </div>
          </div>

          <!-- Lado Direito: Informações Básicas -->
          <div class="col-lg-7 col-xl-8">
            <div class="row g-3">
              <!-- Nome -->
              <div class="col-12">
                <label for="nome" class="form-label fw-bold small text-uppercase text-muted">Nome da Receita *</label>
                <div class="input-group">
                  <span class="input-group-text bg-white border-end-0">
                    <i class="bi bi-type text-primary"></i>
                  </span>
                  <input 
                    type="text" 
                    class="form-control border-start-0 ps-0" 
                    id="nome" 
                    v-model="form.nome" 
                    required 
                    placeholder="Ex: Brigadeiro Gourmet de Pistache"
                  >
                </div>
              </div>

              <!-- Categoria -->
              <div class="col-md-12">
                <label for="categoria" class="form-label fw-bold small text-uppercase text-muted">Categoria *</label>
                <div class="input-group">
                  <span class="input-group-text bg-white border-end-0">
                    <i class="bi bi-tag text-primary"></i>
                  </span>
                  <select 
                    class="form-select border-start-0 ps-0" 
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
              </div>

              <!-- Tempo e Porções -->
              <div class="col-sm-6">
                <label for="tempoPreparoMinutos" class="form-label fw-bold small text-uppercase text-muted">Preparo (minutos) *</label>
                <div class="input-group">
                  <span class="input-group-text bg-white border-end-0">
                    <i class="bi bi-clock text-primary"></i>
                  </span>
                  <input 
                    type="number" 
                    class="form-control border-start-0 ps-0" 
                    id="tempoPreparoMinutos" 
                    v-model.number="form.tempoPreparoMinutos" 
                    required 
                    min="1"
                    placeholder="Ex: 45"
                  >
                </div>
              </div>

              <div class="col-sm-6">
                <label for="porcoes" class="form-label fw-bold small text-uppercase text-muted">Faz quantas porções? *</label>
                <div class="input-group">
                  <span class="input-group-text bg-white border-end-0">
                    <i class="bi bi-people text-primary"></i>
                  </span>
                  <input 
                    type="number" 
                    class="form-control border-start-0 ps-0" 
                    id="porcoes" 
                    v-model.number="form.porcoes" 
                    required 
                    min="1"
                    placeholder="Ex: 8"
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Ingredientes -->
          <div class="col-12">
            <hr class="my-3 opacity-10">
            <label for="ingredientes" class="form-label fw-bold h6 mb-3 d-flex align-items-center">
              <i class="bi bi-list-check me-2 text-primary"></i>
              Ingredientes *
            </label>
            <textarea 
              class="form-control bg-light border-0" 
              id="ingredientes" 
              rows="4" 
              v-model="form.ingredientes" 
              required
              placeholder="Liste os ingredientes aqui... (Dica: Use um por linha)"
              style="resize: none;"
            ></textarea>
          </div>

          <!-- Modo de Preparo -->
          <div class="col-12">
            <label for="modoPreparo" class="form-label fw-bold h6 mb-3 d-flex align-items-center">
              <i class="bi bi-journal-text me-2 text-primary"></i>
              Modo de Preparo *
            </label>
            <textarea 
              class="form-control bg-light border-0" 
              id="modoPreparo" 
              rows="6" 
              v-model="form.modoPreparo" 
              required
              placeholder="Descreva o passo a passo..."
              style="resize: none;"
            ></textarea>
          </div>

          <!-- Ações -->
          <div class="col-12 mt-4 pt-3 border-top">
            <div class="d-flex justify-content-end gap-3">
              <button type="button" @click="goBack" class="btn btn-outline-secondary px-4 rounded-pill d-flex align-items-center">
                <i class="bi bi-arrow-left me-2"></i>
                Voltar
              </button>
              <button type="submit" class="btn btn-primary px-5 rounded-pill shadow-sm" :disabled="isSubmitting">
                <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                <i v-else class="bi bi-check2-circle me-1"></i>
                {{ isEdit ? 'Salvar Alterações' : 'Publicar Receita' }}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
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

const router = useRouter()
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

const triggerFileInput = () => {
  fileInput.value?.click()
}

const goBack = () => {
  router.back()
}

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
  // TODO: enviar um campo para indicar a remoção
  
  emit('submit', formData)
}

onUnmounted(() => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
})
</script>

<style scoped>
.image-upload-container {
  transition: all 0.3s ease;
  border: 2px dashed #dee2e6 !important;
}

.image-upload-container:hover {
  border-color: var(--bs-primary) !important;
  background-color: rgba(var(--bs-primary-rgb), 0.05) !important;
}

.image-upload-container img {
  transition: transform 0.5s ease;
}

.image-upload-container:hover img {
  transform: scale(1.02);
}

.input-group-text {
  border-color: #dee2e6;
}

.form-control:focus, .form-select:focus {
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.1);
}

.form-control, .form-select {
  border-color: #dee2e6;
  padding: 0.6rem 0.75rem;
}

textarea.form-control {
  padding: 1rem;
}

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

@media (max-width: 991.98px) {
  .image-upload-container {
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
