<template>
  <div class="login-split-wrapper">
    <!-- Coluna Esquerda: Imagem -->
    <div class="login-image-col">
      <div class="login-overlay">
        <h2 class="display-5 fw-bold mb-3">Sabor & Comunidade</h2>
        <p class="fs-5 opacity-75">Onde as melhores receitas se encontram. Compartilhe seu amor pela culinária.</p>
      </div>
    </div>

    <!-- Coluna Direita: Formulário -->
    <div class="login-form-col">
      <div class="login-form-inner">
        <div class="text-center mb-4">
          <NuxtLink to="/">
            <img src="/img/logo.png" alt="Logo" height="80" class="mb-3">
          </NuxtLink>
          <h1 class="h3 fw-bold mb-1">Bem-vinde de volta!</h1>
          <p class="text-muted small">Entre com sua conta para continuar</p>
        </div>

        <AuthLoginForm />

        <div class="text-center mt-4">
          <p class="mb-0 small text-muted">
            Deseja fazer parte?
            <NuxtLink to="/register" class="text-primary fw-bold text-decoration-none">
              Crie sua conta agora
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: 'guest',
})
</script>

<style scoped>
.login-split-wrapper {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.login-image-col {
  flex: 0 0 50%;
  position: relative;
  background-image: url('/img/login-bg.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
}

.login-image-col::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0) 60%);
}

.login-overlay {
  position: relative;
  z-index: 1;
  padding: 3rem;
  color: white;
}

.login-form-col {
  flex: 0 0 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  overflow-y: auto;
  animation: fadeIn 0.6s ease-out;
}

.login-form-inner {
  width: 100%;
  max-width: 420px;
  padding: 2rem;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 0.75rem 2rem rgba(0, 0, 0, 0.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 991.98px) {
  .login-split-wrapper {
    flex-direction: column;
  }

  .login-image-col {
    flex: 0 0 35%;
  }

  .login-form-col {
    flex: 1;
  }
}
</style>