<template>
  <main class="bg-light min-vh-100">
    <!-- Banner de Edição -->
    <div class="recipe-banner d-flex align-items-center justify-content-center text-center p-5">
      <div class="banner-overlay"></div>
      <div class="banner-content position-relative text-white">
        <h1 class="display-4 fw-bold mb-2">Editar Receita</h1>
        <div v-if="recipe" class="d-flex flex-column align-items-center">
          <p class="lead opacity-75 mb-3">
            Atualize as informações da receita: <strong>{{ recipe.nome }}</strong>
          </p>
          <button 
            type="button" 
            class="btn btn-danger btn-sm rounded-pill px-3 shadow-sm border-0" 
            @click="showDeleteModal = true"
            :disabled="isDeleting"
          >
            <i class="bi bi-trash-fill me-1"></i>
            Apagar Receita
          </button>
        </div>
      </div>
    </div>

    <div class="container pb-5">
      <div class="row justify-content-center mt-n5 position-relative z-1">
        <div class="col-lg-10">
          <div class="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div class="card-body p-0">
              <!-- Loader e mensagens de erro do fetch inicial -->
              <div v-if="isFetching" class="text-center py-5 my-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Carregando Receita...</span>
                </div>
              </div>
              
              <div v-else-if="fetchError" class="alert alert-danger m-4 text-center border-0 shadow-sm rounded-3">
                <i class="bi bi-exclamation-octagon me-2"></i>
                {{ fetchError }}
                <div class="mt-3">
                  <NuxtLink to="/receitas" class="btn btn-outline-danger rounded-pill">Voltar</NuxtLink>
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
        </div>
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
import { ref, onMounted } from 'vue'
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

<style scoped>
.recipe-banner {
  height: 350px;
  background-image: url('/img/banner-bg.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7));
}

.banner-content {
  z-index: 2;
  text-shadow: 0 4px 8px rgba(0,0,0,0.5);
}

.mt-n5 {
  margin-top: -5rem !important;
}

.z-1 {
  z-index: 10;
}
</style>
