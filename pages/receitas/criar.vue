<template>
  <main class="bg-light min-vh-100">
    <!-- Banner de Criação -->
    <div class="recipe-banner d-flex align-items-center justify-content-center text-center p-5">
      <div class="banner-overlay"></div>
      <div class="banner-content position-relative text-white">
        <h1 class="display-4 fw-bold mb-2">Criar Receita</h1>
        <p class="lead opacity-75">Compartilhe sua nova receita com a comunidade.</p>
      </div>
    </div>

    <div class="container pb-5">
      <div class="row justify-content-center mt-n5 position-relative z-1">
        <div class="col-lg-10">
          <div class="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div class="card-body p-0">
              <RecipeForm 
                :is-submitting="pending"
                :error="error"
                @submit="onSubmit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

definePageMeta({
  middleware: 'auth',
})

const router = useRouter()
const { createRecipe, pending, error } = useRecipes()

const onSubmit = async (formData: FormData) => {
  try {
    const newRecipe = await createRecipe(formData)
    if (newRecipe && newRecipe.id) {
      router.push(`/receitas/${newRecipe.id}`)
    } else {
      router.push('/receitas')
    }
  } catch (e) {
    // Error is already handled by useRecipes composable
    console.error(e)
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
