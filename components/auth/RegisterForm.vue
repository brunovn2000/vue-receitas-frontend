<template>
  <div v-if="success" class="text-center py-4">
    <div
      class="rounded-circle bg-success text-white d-flex align-items-center justify-content-center mx-auto mb-4 animate-bounce"
      style="width: 80px; height: 80px;"
    >
      <span class="fs-1">✅</span>
    </div>
    <h3 class="h4 fw-bold text-success mb-3">Cadastro realizado!</h3>
    <p class="text-muted mb-4">
      Sua conta foi criada com sucesso. Agora você já pode acessar o sistema com suas credenciais.
    </p>
    <NuxtLink to="/login" class="btn btn-primary w-100">
      Fazer Login agora
    </NuxtLink>
  </div>

  <form v-else @submit.prevent="onSubmit" novalidate>
    <div class="mb-3">
      <label for="nome" class="form-label">Nome Completo</label>
      <input
        id="nome"
        v-model="form.nome"
        type="text"
        class="form-control"
        placeholder="Seu nome"
        required
      >
    </div>

    <div class="mb-3">
      <label for="login" class="form-label">Usuário</label>
      <input
        id="login"
        v-model="form.login"
        type="text"
        class="form-control"
        placeholder="Escolha um login"
        required
      >
    </div>

    <div class="mb-3">
      <label for="senha" class="form-label">Senha</label>
      <input
        id="senha"
        v-model="form.senha"
        type="password"
        class="form-control"
        placeholder="Mínimo 6 caracteres"
        required
      >
    </div>

    <div v-if="errorMessage" class="alert alert-danger py-2 mt-3">
      {{ errorMessage }}
    </div>

    <button class="btn btn-primary w-100 mt-4" type="submit" :disabled="pending">
      <span
        v-if="pending"
        class="spinner-border spinner-border-sm me-2"
        role="status"
        aria-hidden="true"
      />
      Criar conta
    </button>
  </form>
</template>

<script setup lang="ts">
import { authService } from '~/services/auth.service'

const form = reactive({
  nome: '',
  login: '',
  senha: '',
})

const pending = ref(false)
const success = ref(false)
const errorMessage = ref('')

const onSubmit = async () => {
  errorMessage.value = ''
  
  if (!form.nome || !form.login || !form.senha) {
    errorMessage.value = 'Por favor, preencha todos os campos.'
    return
  }

  if (form.senha.length < 6) {
    errorMessage.value = 'A senha deve ter pelo menos 6 caracteres.'
    return
  }

  if (form.login.length < 3 || form.nome.length  < 3) {
    errorMessage.value = 'O login e o nome devem ter pelo menos 3 caracteres.'
    return
  }

  pending.value = true

  try {
    await authService.register({
      nome: form.nome,
      login: form.login,
      senha: form.senha
    })
    
    success.value = true
  } catch (error: any) {
    errorMessage.value = error.data?.message || 'Erro ao realizar cadastro. Tente novamente.'
  } finally {
    pending.value = false
  }
}
</script>

<style scoped>
.animate-bounce {
  animation: bounce 0.5s ease-in-out;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>
