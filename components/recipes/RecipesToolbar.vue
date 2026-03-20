<template>
  <div class="row mb-4 justify-content-center">
    <div class="col-md-8 col-lg-6">
      <div class="input-group input-group-lg shadow-sm">
        <span id="search-addon" class="input-group-text bg-white border-end-0">
          
        </span>
        <input
          id="search"
          :value="modelValue"
          type="text"
          class="form-control border-start-0 ps-0"
          placeholder="Digite nome ou ingrediente da receita..."
          aria-label="Buscar receita"
          aria-describedby="search-addon"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>