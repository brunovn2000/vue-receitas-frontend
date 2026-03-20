<template>
  <main>
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">Criar Receita</h1>
          <p class="lead text-body-secondary">
            Compartilhe sua nova receita com a comunidade.
          </p>
        </div>
      </div>
    </section>

    <div class="album py-5 bg-body-tertiary pb-5">
      <div class="container bg-white p-5 rounded shadow-sm">
        <RecipeForm 
          :is-submitting="pending"
          :error="error"
          @submit="onSubmit"
        />
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
