<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div class="container">
        <NuxtLink to="/" class="navbar-brand fw-bold">
          Receitas RG
        </NuxtLink>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Alternar navegação"
        >
          <span class="navbar-toggler-icon" />
        </button>

        <div id="mainNavbar" class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <NuxtLink to="/" class="nav-link">Início</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/receitas" class="nav-link">Receitas</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/login" class="nav-link">Entrar</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>