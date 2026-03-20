<template>
  <section class="py-5">
    <div class="container">
      <div class="mb-4 d-flex justify-content-between align-items-center">
        <NuxtLink to="/receitas" class="btn btn-outline-secondary btn-sm">
          ← Voltar
        </NuxtLink>
        <div v-if="recipe" class="d-flex gap-2">
          <button 
            type="button" 
            class="btn btn-outline-info btn-sm"
            @click="handlePrint"
            :disabled="isPrinting"
          >
            <span v-if="isPrinting" class="spinner-border spinner-border-sm me-1"></span>
            Imprimir Receita
          </button>
          
          <NuxtLink :to="`/receitas/${recipe.id}/editar`" class="btn btn-primary btn-sm">
            Editar Receita
          </NuxtLink>
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

      <div id="recipe-content" class="row g-4 bg-white p-3 rounded mt-2">
        <div class="col-lg-6">
          <div
            v-if="recipe?.imagem"
            class="rounded overflow-hidden shadow-sm d-flex justify-content-center"
          >
            <img :src="recipe.imagem" :alt="recipe.nome" class="img-fluid" style="object-fit: contain; max-height: 400px;">
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
    
    <!-- Modal de Confirmação -->
    <DeleteRecipeModal 
      v-model="showDeleteModal"
      :is-deleting="isDeleting"
      :recipe-name="recipe?.nome"
      @confirm="handleDeleteConfirmed"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

definePageMeta({
  middleware: 'auth',
})

const router = useRouter()
const route = useRoute()
const recipeId = Number(route.params.id)

const { item: recipe, pending, error, fetchRecipeById, deleteRecipe } = useRecipes()
const isDeleting = ref(false)
const isPrinting = ref(false)
const showDeleteModal = ref(false)

onMounted(() => {
  fetchRecipeById(recipeId)
})

const handlePrint = async () => {
  isPrinting.value = true
  try {
    const element = document.getElementById('recipe-content')
    if (element) {
      const opt = {
        margin:       0.5,
        filename:     `receita-${recipe.value?.nome || recipeId}.pdf`,
        image:        { type: 'jpeg' as const, quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      }
      const html2pdf = (await import('html2pdf.js')).default
      await html2pdf().set(opt).from(element).save()
    }
  } catch (e) {
    console.error('Erro ao gerar PDF:', e)
  } finally {
    isPrinting.value = false
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
