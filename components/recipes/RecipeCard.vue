<template>
  <div class="card h-100 shadow-sm">
    <img
      v-if="recipe.imagem"
      :src="recipe.imagem"
      class="card-img-top"
      :alt="recipe.nome"
      style="height: 220px; object-fit: cover;"
    >

    <div
      v-else
      class="bg-secondary-subtle d-flex align-items-center justify-content-center"
      style="height: 220px;"
    >
      <span class="text-muted">Sem imagem</span>
    </div>

    <div class="card-body d-flex flex-column">
      <h2 class="h5 card-title">{{ recipe.nome }}</h2>
      <p class="card-text text-muted flex-grow-1">
        {{ recipe.modoPreparo }}
      </p>

      <div class="d-flex justify-content-between align-items-center mt-3">
        <NuxtLink
          :to="`/receitas/${recipe.id}`"
          class="btn btn-sm btn-outline-primary"
        >
          Ver detalhes
        </NuxtLink>

        <small class="text-body-secondary">
          {{ recipe.tempoPreparoMinutos || 'Tempo não informado' }}
        </small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from '~/types/recipe'

defineProps<{
  recipe: Recipe
}>()
</script>