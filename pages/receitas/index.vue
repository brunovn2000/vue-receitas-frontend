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
const pending = ref(false)

const recipes = ref([
  {
    "id": 2,
    "usuario": {
      "id": 1,
      "nome": "Admin",
      "login": "admin"
    },
    "nome": "Bolo de cenoura",
    "tempoPreparoMinutos": 60,
    "porcoes": 4,
    "modoPreparo": "Misture os ingredientes e asse por 40 minutos.",
    "ingredientes": "Farinha, ovos, açúcar",
    "criadoEm": "2023-01-01T00:00:00",
    "alteradoEm": "2023-01-01T00:00:00",
    "imagem": 'https://static.itdg.com.br/images/640-400/34b9fb585d6b2730ab91a3422a0e9d50/bolo-de-cenoura.jpg'
  },
  {
    "id": 2,
    "usuario": {
      "id": 1,
      "nome": "Admin",
      "login": "admin"
    },
    "nome": "Bolo de cenoura",
    "tempoPreparoMinutos": 60,
    "porcoes": 4,
    "modoPreparo": "Misture os ingredientes e asse por 40 minutos.",
    "ingredientes": "Farinha, ovos, açúcar",
    "criadoEm": "2023-01-01T00:00:00",
    "alteradoEm": "2023-01-01T00:00:00",
    "imagem": 'https://static.itdg.com.br/images/640-400/34b9fb585d6b2730ab91a3422a0e9d50/bolo-de-cenoura.jpg'
  },
  {
    "id": 4,
    "usuario": {
      "id": 1,
      "nome": "Admin",
      "login": "admin"
    },
    "nome": "Bolo de cenoura",
    "tempoPreparoMinutos": 60,
    "porcoes": 4,
    "modoPreparo": "Misture os ingredientes e asse por 40 minutos.",
    "ingredientes": "Farinha, ovos, açúcar",
    "criadoEm": "2023-01-01T00:00:00",
    "alteradoEm": "2023-01-01T00:00:00",
    "imagem": 'https://static.itdg.com.br/images/640-400/34b9fb585d6b2730ab91a3422a0e9d50/bolo-de-cenoura.jpg'
  }
])

const filteredRecipes = computed(() => {
  const term = search.value.trim().toLowerCase()

  if (!term) return recipes.value

  return recipes.value.filter(recipe =>
    recipe.nome.toLowerCase().includes(term) ||
    recipe.modoPreparo.toLowerCase().includes(term)
  )
})
</script>