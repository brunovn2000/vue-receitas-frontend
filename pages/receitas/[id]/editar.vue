<template>
  <main>
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">Editar Receita</h1>
          <div v-if="recipe" class="d-flex flex-column align-items-center">
            <p class="lead text-body-secondary mb-2">
              Atualize as informações da receita: <strong>{{ recipe.nome }}</strong>.
            </p>
            <button 
              type="button" 
              class="btn btn-outline-danger btn-sm" 
              @click="showDeleteModal = true"
              :disabled="isDeleting"
            >
              Apagar Receita
            </button>
          </div>
        </div>
      </div>
    </section>

    <div class="album py-5 bg-body-tertiary pb-5">
      <div class="container bg-white p-5 rounded shadow-sm">
        <!-- Loader e mensagens de erro do fetch inicial -->
        <div v-if="isFetching" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Carregando Receita...</span>
          </div>
        </div>
        
        <div v-else-if="fetchError" class="alert alert-danger text-center">
          {{ fetchError }}
          <div class="mt-3">
            <NuxtLink to="/receitas" class="btn btn-outline-danger">Voltar</NuxtLink>
          </div>
        </div>

        <!-- Formulário -->
        <RecipeForm 
          v-else-if="recipe"
          :initial-data="recipe"
          :is-submitting="pending"
          :error="error"
          @submit="onSubmit"
        />
      </div>
    </div>

    <!-- Modal de Confirmação -->
    <DeleteRecipeModal 
      v-model="showDeleteModal"
      :is-deleting="isDeleting"
      :recipe-name="recipe?.nome"
      @confirm="handleDeleteConfirmed"
    />
  </main>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

definePageMeta({
  middleware: 'auth',
})

const router = useRouter()
const route = useRoute()
const recipeId = Number(route.params.id)

const { item: recipe, pending: isFetching, error: fetchError, fetchRecipeById, updateRecipe, deleteRecipe, pending, error } = useRecipes()

const isDeleting = ref(false)
const showDeleteModal = ref(false)

onMounted(() => {
  if (recipeId) {
    fetchRecipeById(recipeId)
  }
})

const onSubmit = async (formData: FormData) => {
  try {
    await updateRecipe(recipeId, formData)
    router.push(`/receitas/${recipeId}`)
  } catch (e) {
    console.error(e)
  }
}

const handleDeleteConfirmed = async () => {
  isDeleting.value = true
  try {
    await deleteRecipe(recipeId)
    showDeleteModal.value = false
    router.push('/receitas')
  } catch (e) {
    console.error(e)
  } finally {
    isDeleting.value = false
  }
}
</script>
