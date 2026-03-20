<script setup lang="ts">
const auth = useAuth()
const onLogout = async () => {
  auth.logout()
  await navigateTo('/login')
}
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div class="container">
        <NuxtLink to="/" class="navbar-brand fw-bold d-flex align-items-center">
          <img src="/img/logo.png" alt="Logo" height="30" class="me-2">
          Receitas
        </NuxtLink>

        <div class="d-flex align-items-center gap-2 ms-auto">
          <NuxtLink to="/receitas" class="btn btn-outline-light btn-sm">
            Receitas
          </NuxtLink>
          <template v-if="auth.isAuthenticated.value">
            <button
              class="btn btn-light btn-sm"
              @click="onLogout"
            >
              Sair
            </button>
          </template>

          <NuxtLink
            v-else
            to="/login"
            class="btn btn-light btn-sm"
          >
            Entrar
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>