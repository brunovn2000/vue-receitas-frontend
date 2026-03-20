<template>
  <section class="py-5">
    <div class="container">
      <div class="mb-4">
        <NuxtLink to="/receitas" class="btn btn-outline-secondary btn-sm">
          ← Voltar
        </NuxtLink>
      </div>

      <div class="row g-4">
        <div class="col-lg-6">
          <div
            v-if="recipe?.imagem"
            class="rounded overflow-hidden shadow-sm"
          >
            <img :src="recipe.imagem" :alt="recipe.nome" class="img-fluid w-100">
          </div>

          <div
            v-else
            class="bg-secondary-subtle rounded d-flex align-items-center justify-content-center shadow-sm"
            style="min-height: 360px;"
          >
            <span class="text-muted">Imagem da receita</span>
          </div>
        </div>

        <div class="col-lg-6">
          <h1 class="mb-3">{{ recipe?.nome }}</h1>
          <p class="text-muted">{{ recipe?.modoPreparo }}</p>

          <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between">
              <span>Tempo de preparo</span>
              <strong>{{ recipe?.tempoPreparoMinutos || 'Não informado' }}</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>ID</span>
              <strong>{{ recipe?.id }}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const route = useRoute()
const { item: recipe, pending, error, fetchRecipeById } = useRecipes()

onMounted(() => {
  fetchRecipeById(Number(route.params.id))
})
</script>