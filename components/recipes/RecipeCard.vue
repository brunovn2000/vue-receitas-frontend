<template>
  <NuxtLink :to="`/receitas/${recipe.id}`" class="text-decoration-none">
    <div class="card h-100 shadow-sm border recipe-card">
      <div class="position-relative overflow-hidden">
        <img
          v-if="recipe.imagem"
          :src="recipe.imagem"
          class="card-img-top object-fit-cover"
          :alt="recipe.nome"
          style="height: 220px;"
        >
        <div
          v-else
          class="d-flex align-items-center justify-content-center card-img-top placeholder-image"
          style="height: 220px;"
        >
          <div class="text-center">
            <i class="bi bi-egg-fried fs-1 text-primary-emphasis opacity-25"></i>
            <div class="small text-muted mt-2 fw-medium">Sabor em preparo...</div>
          </div>
        </div>

        <span
          v-if="recipe.categoria"
          class="position-absolute top-0 end-0 m-3 badge bg-primary bg-opacity-75 text-white shadow-sm"
          style="backdrop-filter: blur(4px);"
        >
          {{ recipe.categoria.nome }}
        </span>
      </div>

      <div class="card-body d-flex flex-column p-4">
        <h3 class="h5 card-title fw-bold text-dark text-truncate mb-1" :title="recipe.nome">
          {{ recipe.nome }}
        </h3>
        
        <div class="text-muted small mb-3">
          <i class="bi bi-person-circle me-1"></i>
          {{ recipe.usuario?.nome || 'Comunidade' }}
        </div>

        <p class="card-text text-secondary flex-grow-1 small" style="display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          {{ recipe.modoPreparo }}
        </p>

        <hr class="text-body-tertiary">

        <div class="d-flex justify-content-between align-items-center text-muted small">
          <div title="Tempo de preparo">
            <i class="bi bi-clock me-1 text-primary"></i>
            {{ recipe.tempoPreparoMinutos ? `${recipe.tempoPreparoMinutos} min` : '--' }}
          </div>
          <div title="Rendimento">
            <i class="bi bi-people me-1 text-primary"></i>
            {{ recipe.porcoes ? `${recipe.porcoes} porçõe(s)` : '--' }}
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Recipe } from '~/types/recipe'

defineProps<{
  recipe: Recipe
}>()
</script>

<style scoped>
.recipe-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-color: rgba(0,0,0,0.08) !important;
  background-color: #fff;
}

.recipe-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.12) !important;
  border-color: rgba(13,110,253,0.2) !important;
}

.placeholder-image {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.recipe-card:hover .card-img-top {
  transform: scale(1.05);
}

.card-img-top {
  transition: transform 0.5s ease;
}
</style>