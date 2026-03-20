<template>
  <form @submit.prevent="onSubmit" novalidate>
    <div class="mb-3">
      <label for="login" class="form-label">Usuário ou e-mail</label>
      <input
        id="login"
        v-model="form.login"
        type="text"
        class="form-control"
        placeholder="Digite seu login"
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
        placeholder="Digite sua senha"
        required
      >
    </div>

    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="form-check">
        <input id="remember" v-model="form.remember" class="form-check-input" type="checkbox">
        <label class="form-check-label" for="remember">
          Lembrar de mim
        </label>
      </div>

      <a href="#" class="small text-decoration-none">Esqueci minha senha</a>
    </div>

    <div v-if="errorMessage" class="alert alert-danger py-2">
      {{ errorMessage }}
    </div>

    <button class="btn btn-primary w-100" type="submit" :disabled="pending">
      <span
        v-if="pending"
        class="spinner-border spinner-border-sm me-2"
        aria-hidden="true"
      />
      Entrar
    </button>
  </form>
</template>

<script setup lang="ts">
const auth = useAuth()

const form = reactive({
  login: '',
  senha: '',
  remember: true,
})

const pending = ref(false)
const errorMessage = ref('')

const onSubmit = async () => {
  errorMessage.value = ''
  pending.value = true

  try {
    await auth.login({
      login: form.login,
      senha: form.senha,
    })
    await navigateTo('/receitas')
  } catch (error) {
    errorMessage.value = 'Credenciais inválidas.'
  } finally {
    pending.value = false
  }
}
</script>