<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal-backdrop fade show" style="z-index: 1050;"></div>
    <div 
      class="modal fade" 
      :class="{ 'show d-block': modelValue }" 
      tabindex="-1"
      @click.self="close"
      style="z-index: 1055;"
      aria-modal="true"
      role="dialog"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content shadow">
          <div class="modal-header border-0 pb-0">
            <h5 class="modal-title text-danger fw-bold">
              Confirmar Exclusão
            </h5>
            <button type="button" class="btn-close" @click="close" aria-label="Close" :disabled="isDeleting"></button>
          </div>
          <div class="modal-body">
            <p class="mb-0">
              Tem certeza que deseja apagar a receita 
              <strong v-if="recipeName">{{ recipeName }}</strong>?
            </p>
            <p class="text-muted small mt-2 mb-0">Esta ação não poderá ser desfeita.</p>
          </div>
          <div class="modal-footer border-0 pt-0">
            <button type="button" class="btn btn-light" @click="close" :disabled="isDeleting">
              Cancelar
            </button>
            <button type="button" class="btn btn-danger px-4" @click="confirm" :disabled="isDeleting">
              <span v-if="isDeleting" class="spinner-border spinner-border-sm me-2" role="status"></span>
              Apagar
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  isDeleting: boolean
  recipeName?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
}>()

const close = () => {
  if (!props.isDeleting) {
    emit('update:modelValue', false)
  }
}

const confirm = () => {
  emit('confirm')
}

// Lock body scroll when modal is open
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>
