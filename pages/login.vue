<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-5">
      <div class="text-center mb-4">
        <h1 class="h3 fw-bold">Acessar sistema</h1>
        <p class="text-muted mb-0">
          Entre para gerenciar receitas e acessar funcionalidades privadas.
        </p>
      </div>

      <div class="card shadow border-0">
        <div class="card-body p-4 p-md-5">
          <div
            class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-4"
            style="width: 72px; height: 72px;"
          >
            <span class="fs-3">👤</span>
          </div>

          <AuthLoginForm />
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