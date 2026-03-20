<template>
  <section class="py-5 text-center container">
    <div class="row py-lg-5">
      <div class="col-lg-8 col-md-10 mx-auto">
        <h1 class="fw-light">Galeria de receitas</h1>
        <p class="lead text-body-secondary">
          Explore receitas cadastradas, visualize detalhes e gerencie conteúdo em uma interface simples.
        </p>
        <p>
          <NuxtLink to="/receitas" class="btn btn-primary my-2 me-2">
            Ver receitas
          </NuxtLink>
          <NuxtLink to="/login" class="btn btn-outline-secondary my-2">
            Entrar no sistema
          </NuxtLink>
        </p>
      </div>
    </div>
  </section>

  <section class="py-5 bg-body-tertiary">
    <div class="container">
      <div class="row g-4">
        <div class="col-md-4" v-for="item in highlights" :key="item.title">
          <div class="card h-100 shadow-sm border-0">
            <div class="card-body">
              <h2 class="h5">{{ item.title }}</h2>
              <p class="text-muted mb-0">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const highlights = [
  {
    title: 'Listagem rápida',
    description: 'Consulte receitas com navegação simples e visual limpo.',
  },
  {
    title: 'Área autenticada',
    description: 'Controle acesso por login e prepare o consumo da API real.',
  },
  {
    title: 'Base escalável',
    description: 'Componentes prontos para busca, filtros e detalhes.',
  },
]
</script>