<template>
  <footer class="bg-dark text-light py-5 mt-auto">
    <div class="container">
      <div class="row gy-4">
        <!-- Logo -->
        <div class="col-lg-4 col-md-6">
          <h5 class="fw-bold mb-3 d-flex align-items-center">
            <i class="bi bi-egg-fried me-2 text-warning fs-4"></i>
            Comunidade de Receitas
          </h5>
          <p class="text-secondary small mb-4 pe-lg-4">
            A sua plataforma definitiva para explorar, compartilhar e salvar as melhores receitas do mundo culinário. Tudo feito de pessoas reais, para pessoas reais.
          </p>
          <div class="d-flex gap-3">
            <a href="#" class="text-secondary text-decoration-none bg-dark-subtle rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px; transition: color 0.2s;">
              <i class="bi bi-instagram fs-5"></i>
            </a>
            <a href="#" class="text-secondary text-decoration-none bg-dark-subtle rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px; transition: color 0.2s;">
              <i class="bi bi-twitter-x fs-5"></i>
            </a>
            <a href="#" class="text-secondary text-decoration-none bg-dark-subtle rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px; transition: color 0.2s;">
              <i class="bi bi-github fs-5"></i>
            </a>
          </div>
        </div>

        <!--  Links -->
        <div class="col-lg-2 col-md-6">
          <h6 class="text-uppercase fw-bold mb-3 text-white-50">Navegação</h6>
          <ul class="list-unstyled mb-0 d-flex flex-column gap-2">
            <li><NuxtLink to="/receitas" class="text-secondary text-decoration-none hover-white">Galeria de Receitas</NuxtLink></li>
            <li><NuxtLink to="/receitas/criar" class="text-secondary text-decoration-none hover-white">Nova Receita</NuxtLink></li>
            <li><NuxtLink to="/login" class="text-secondary text-decoration-none hover-white">Entrar na Conta</NuxtLink></li>
          </ul>
        </div>

        <!-- Categories -->
        <div class="col-lg-2 col-md-6">
          <h6 class="text-uppercase fw-bold mb-3 text-white-50">Explorar</h6>
          <ul class="list-unstyled mb-0 d-flex flex-column gap-2">
            <li><a href="#" class="text-secondary text-decoration-none hover-white">Sobremesas</a></li>
            <li><a href="#" class="text-secondary text-decoration-none hover-white">Pratos Principais</a></li>
            <li><a href="#" class="text-secondary text-decoration-none hover-white">Lanches Rápidos</a></li>
            <li><a href="#" class="text-secondary text-decoration-none hover-white">Bebidas</a></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="col-lg-4 col-md-6">
          <h6 class="text-uppercase fw-bold mb-3 text-white-50">Newsletter</h6>
          <p class="text-secondary small">Receba as melhores receitas da semana direto no seu e-mail. Sem spam.</p>
          <form class="d-flex mt-3" @submit.prevent>
            <input type="email" class="form-control me-2 border-0 bg-secondary bg-opacity-25 text-light placeholder-light" placeholder="Seu melhor e-mail" aria-label="E-mail">
            <button class="btn btn-primary px-3" type="button">Assinar</button>
          </form>
        </div>
      </div>

      <hr class="border-secondary mt-5 mb-4 border-opacity-50">

      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center small text-secondary">
        <p class="mb-0">&copy; {{ new Date().getFullYear() }} Comunidade de Receitas. Todos os direitos reservados.</p>
        <p class="mb-0 mt-2 mt-md-0">
          Feito com <i class="bi bi-heart-fill text-danger mx-1"></i> pelos amantes de código e comida.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.hover-white {
  transition: color 0.2s ease;
}
.hover-white:hover {
  color: #fff !important;
}
.bg-dark-subtle {
  background-color: rgba(255, 255, 255, 0.05) !important;
}
.bg-dark-subtle:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
  color: #fff !important;
}
.placeholder-light::placeholder {
  color: rgba(255, 255, 255, 0.4);
}
</style>