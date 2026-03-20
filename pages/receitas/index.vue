<template>
  <main>
    <!-- Modern Hero Section with Food Background -->
    <section class="py-4 text-center position-relative overflow-hidden bg-dark">
      <div 
        class="position-absolute top-0 start-0 w-100 h-100" 
        style="
          background: url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop') center/cover no-repeat;
          z-index: 0;
        "
      ></div>
      <div class="position-absolute top-0 start-0 w-100 h-100" style="background-color: rgba(33, 37, 41, 0.75); z-index: 0;"></div>
      
      <div class="container position-relative py-5 my-3" style="z-index: 1;">
        <div class="row justify-content-center">
          <div class="col-lg-8 col-md-10 text-white">
            <h1 class="display-4 fw-bold mb-3">
              Receitas da Comunidade
            </h1>
            <p class="lead mb-4 mx-auto opacity-75" style="max-width: 600px;">
              Descubra novos sabores, ingredientes frescos e compartilhe suas criações gastronômicas com o mundo.
            </p>
            <div class="d-flex justify-content-center">
              <NuxtLink to="/receitas/criar" class="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-lg fw-semibold" style="transition: transform 0.2s;">
                <i class="bi bi-plus-lg me-2"></i> Adicionar Nova Receita
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recipes List -->
    <div class="py-5 recipes-section min-vh-100">
      <div class="container">
        <RecipesToolbar v-model="filters" class="mb-5 bg-white p-4 rounded-4 shadow-sm border border-light" />

        <div v-if="pending" class="text-center py-5">
          <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
          <div class="mt-3 text-muted">Buscando receitas fresquinhas...</div>
        </div>

        <div v-else-if="filteredRecipes.length === 0" class="alert alert-light border border-dashed rounded-4 text-center py-5 bg-white shadow-sm">
          <i class="bi bi-search fs-1 text-muted opacity-50 mb-3 d-block"></i>
          <h4 class="text-dark fw-bold">Nenhuma receita encontrada.</h4>
          <p class="text-secondary mb-0">Tente buscar por termos diferentes, limpe os filtros ou adicione uma nova receita.</p>
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

const filters = ref({
  search: '',
  categoryId: ''
})

const { items, pending, error, fetchRecipes } = useRecipes()

onMounted(() => {
  fetchRecipes()
})

watch(filters, (newFilters) => {
  const query: any = {}
  if (newFilters.search) query.search = newFilters.search
  if (newFilters.categoryId) query.categoria = newFilters.categoryId
  
  fetchRecipes(Object.keys(query).length ? query : {})
}, { deep: true })


const filteredRecipes = computed(() => {
  let result = items.value

  const term = filters.value.search.trim().toLowerCase()
  if (term) {
    result = result.filter(recipe =>
      recipe.nome.toLowerCase().includes(term) ||
      recipe.modoPreparo.toLowerCase().includes(term)
    )
  }

  if (filters.value.categoryId) {
    result = result.filter(recipe => recipe.categoria?.id === Number(filters.value.categoryId))
  }

  return result
})
</script>

<style scoped>
.recipes-section {
  background-color: #f3f4f6;
  border-top: 1px solid rgba(0,0,0,0.05);
}
</style>