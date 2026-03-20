<template>
  <section class="py-5 text-center container">
    <div class="row py-lg-4">
      <div class="col-lg-8 col-md-10 mx-auto">
        <h1 class="fw-light">Receitas</h1>
        <p class="lead text-body-secondary">
          Explore a coleção de receitas disponíveis.
        </p>
      </div>
    </div>
  </section>

  <section class="pb-5">
    <div class="container">
      <RecipesToolbar v-model="search" />

      <div v-if="pending" class="text-center py-5">
        <div class="spinner-border" role="status" />
      </div>

      <div v-else-if="filteredRecipes.length === 0" class="alert alert-light border">
        Nenhuma receita encontrada.
      </div>

      <RecipesGrid v-else :recipes="filteredRecipes" />
    </div>
  </section>
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