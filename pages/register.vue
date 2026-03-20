<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-5">
      <div class="text-center mb-4">
        <h1 class="h3 fw-bold">Criar nova conta</h1>
        <p class="text-muted mb-0">
          Cadastre-se para começar a gerenciar suas receitas.
        </p>
      </div>

      <div class="card shadow border-0">
        <div class="card-body p-4 p-md-5">
          <div
            class="d-flex align-items-center justify-content-center mx-auto mb-4"
            style="width: 120px; height: 120px;"
          >
            <img src="/img/logo.png" alt="Receitas RG Logo" class="img-fluid">
          </div>

          <AuthRegisterForm />

          <div class="text-center mt-4">
            <p class="mb-0 small text-muted">
              Já tem uma conta?
              <NuxtLink to="/login" class="text-primary fw-bold text-decoration-none">
                Entre agora
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'guest',
})
</script>
