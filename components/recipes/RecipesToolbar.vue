<template>
  <div class="row mb-4">
    <div class="col-md-8 col-lg-6">
      <label for="search" class="form-label">Buscar receita</label>
      <input
        id="search"
        :value="modelValue"
        type="text"
        class="form-control"
        placeholder="Digite nome ou descrição"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
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