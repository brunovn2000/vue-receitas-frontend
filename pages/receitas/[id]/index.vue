<template>
  <main class="bg-light min-vh-100">
    <div v-if="pending" class="container py-5 text-center">
      <div class="spinner-border text-primary size-lg" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>

    <div v-else-if="recipe" class="container py-5">
      <!-- Breadcrumbs & Actions -->
      <nav aria-label="breadcrumb" class="mb-4 d-flex flex-wrap justify-content-between align-items-center gap-3 mt-4">
        <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item"><NuxtLink to="/receitas" class="text-decoration-none">Receitas</NuxtLink></li>
          <li class="breadcrumb-item active" aria-current="page">{{ recipe.nome }}</li>
        </ol>

        <div class="d-flex gap-2">
          <button 
            type="button" 
            class="btn btn-white border shadow-sm btn-sm px-3"
            @click="handlePrint"
            :disabled="isPrinting"
          >
            <i v-if="!isPrinting" class="bi bi-printer me-1"></i>
            <span v-else class="spinner-border spinner-border-sm me-1"></span>
            Imprimir
          </button>
          
          <NuxtLink :to="`/receitas/${recipe.id}/editar`" class="btn btn-primary shadow-sm btn-sm px-3">
            <i class="bi bi-pencil me-1"></i> Editar
          </NuxtLink>
          
          <button 
            type="button" 
            class="btn btn-outline-danger shadow-sm btn-sm px-3" 
            @click="showDeleteModal = true"
            :disabled="isDeleting"
          >
            <i class="bi bi-trash me-1"></i> Excluir
          </button>
        </div>
      </nav>

      <!-- Recipe Header Card -->
      <div class="card border-0 shadow-sm rounded-4 overflow-hidden mb-5 animate-fade-in">
        <div class="row g-0">
          <div class="col-lg-5">
            <div class="h-100 bg-white d-flex align-items-center justify-content-center p-3">
              <img 
                v-if="recipe.imagem" 
                :src="recipe.imagem" 
                :alt="recipe.nome" 
                class="img-fluid rounded-3 shadow-sm object-fit-cover w-100" 
                style="max-height: 450px; min-height: 300px;"
              >
              <div v-else class="w-100 h-100 bg-light rounded-4 d-flex flex-column align-items-center justify-content-center py-5 text-muted opacity-50" style="min-height: 300px;">
                <i class="bi bi-egg-fried display-1"></i>
                <p class="mt-3">Aguardando registro visual</p>
              </div>
            </div>
          </div>
          <div class="col-lg-7">
            <div class="card-body p-4 p-xl-5 h-100 d-flex flex-column justify-content-center bg-white">
              <div class="mb-3">
                <span v-if="recipe.categoria" class="badge rounded-pill bg-primary bg-opacity-10 text-primary px-3 py-2 mb-2">
                  <i class="bi bi-tag-fill me-1"></i> {{ recipe.categoria.nome }}
                </span>
                <h1 class="display-5 fw-bold text-dark mb-2">{{ recipe.nome }}</h1>
                <div class="d-flex align-items-center text-muted small mt-3">
                  <div class="d-flex align-items-center me-4">
                    <i class="bi bi-person-circle fs-5 me-2 text-primary"></i>
                    <span>Por <strong class="text-dark">{{ recipe.usuario?.nome || 'Comunidade' }}</strong></span>
                  </div>
                  <div class="d-flex align-items-center">
                    <i class="bi bi-calendar3 me-2"></i>
                    <span>{{ formatDate(recipe.criadoEm) }}</span>
                  </div>
                </div>
              </div>

              <hr class="my-4 opacity-25">

              <div class="row text-center g-3">
                <div class="col-6 col-sm-4 text-start border-end pe-4">
                  <div class="text-secondary small text-uppercase fw-bold mb-1">Preparo</div>
                  <div class="h4 mb-0 fw-bold text-dark">
                    <i class="bi bi-clock me-2 text-primary"></i>
                    {{ recipe.tempoPreparoMinutos }}'
                  </div>
                </div>
                <div class="col-6 col-sm-4 text-start">
                  <div class="text-secondary small text-uppercase fw-bold mb-1">Rendimento</div>
                  <div class="h4 mb-0 fw-bold text-dark">
                    <i class="bi bi-people me-2 text-primary"></i>
                    {{ recipe.porcoes }} <span class="fs-6 fw-normal">un</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recipe Content Grid -->
      <div id="recipe-content" class="row g-4">
        <!-- Ingredients Section -->
        <div class="col-lg-4">
          <div class="card border-0 shadow-sm rounded-4 h-100">
            <div class="card-body p-4">
              <h4 class="fw-bold mb-4 d-flex align-items-center">
                <i class="bi bi-list-check text-primary me-2"></i>
                Ingredientes
              </h4>
              <div class="ingredients-list whitespace-pre-line text-secondary lh-lg fs-5">
                {{ recipe.ingredientes || 'Nenhum ingrediente informado.' }}
              </div>
            </div>
          </div>
        </div>

        <!-- Mode of Preparation Section -->
        <div class="col-lg-8">
          <div class="card border-0 shadow-sm rounded-4 h-100">
            <div class="card-body p-4 p-xl-5">
              <h4 class="fw-bold mb-4 d-flex align-items-center">
                <i class="bi bi-journal-text text-primary me-2"></i>
                Modo de Preparo
              </h4>
              <div class="preparation-steps whitespace-pre-line text-secondary lh-lg fs-5">
                {{ recipe.modoPreparo }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="container py-5 text-center">
      <div class="alert alert-danger rounded-4 py-5 shadow-sm">
        <i class="bi bi-exclamation-triangle display-1 mb-3"></i>
        <h3>Ops! Não conseguimos carregar essa receita.</h3>
        <p class="text-secondary">{{ error.message || 'Verifique sua conexão ou tente novamente mais tarde.' }}</p>
        <NuxtLink to="/receitas" class="btn btn-danger px-4 rounded-pill mt-3">Voltar para listagem</NuxtLink>
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

const formatDate = (dateStr: string) => {
  if (!dateStr) return '--'
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

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

<style scoped>
.size-lg {
  width: 4rem;
  height: 4rem;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: "›";
  font-size: 1.2rem;
  line-height: 1;
  vertical-align: middle;
}

.whitespace-pre-line {
  white-space: pre-line;
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.btn-white {
  background-color: #fff;
  color: #6c757d;
}

.btn-white:hover {
  background-color: #f8f9fa;
  color: #212529;
}
</style>
