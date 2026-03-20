<template>
  <main>
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">Receitas</h1>
          <p class="lead text-body-secondary">
            Explore nossa coleção de receitas incríveis ou compartilhe suas próprias criações culinárias com a comunidade.
          </p>
          <p>
            <NuxtLink to="/receitas/criar" class="btn btn-primary my-2 me-2">Criar nova receita</NuxtLink>
            <NuxtLink to="/" class="btn btn-secondary my-2">Voltar ao Início</NuxtLink>
          </p>
        </div>
      </div>
    </section>

    <div class="album py-5 bg-body-tertiary">
      <div class="container">
        <RecipesToolbar v-model="search" class="mb-5" />

        <div v-if="pending" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
        </div>

        <div v-else-if="filteredRecipes.length === 0" class="alert alert-light border text-center py-5">
          <span class="fs-4 d-block mb-3"></span>
          Nenhuma receita encontrada.
        </div>

        <RecipesGrid v-else :recipes="filteredRecipes" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const search = ref('')
const { items, pending, error, fetchRecipes } = useRecipes()

onMounted(() => {
  fetchRecipes()
})

watch(search, (value) => {
  fetchRecipes(value ? { search: value } : {})
})


const filteredRecipes = computed(() => {
  const term = search.value.trim().toLowerCase()

  if (!term) return items.value

  return items.value.filter(recipe =>
    recipe.nome.toLowerCase().includes(term) ||
    recipe.modoPreparo.toLowerCase().includes(term)
  )
})
</script>