# 🍳 Receitas Online - Frontend

Bem-vindo ao **Receitas Online**, uma plataforma moderna e intuitiva para criação, gestão e compartilhamento de receitas culinárias. Este projeto foi desenvolvido como parte de um desafio técnico, focando em excelência visual, performance e boas práticas de desenvolvimento.

🌐 **Acesse agora:** [receitas.brunovicente.cloud](https://receitas.brunovicente.cloud)

---

## 🚀 Tecnologias Utilizadas

Este projeto utiliza o que há de mais moderno no ecossistema Vue:

- **Framework**: [Nuxt 3](https://nuxt.com/) (Vue 3) para SSR, performance e SEO.
- **Linguagem**: TypeScript para segurança de tipos e melhor experiência de desenvolvimento.
- **Estado**: [Pinia](https://pinia.vuejs.org/) para gerenciamento de estado global.
- **Estilização**: [Bootstrap 5](https://getbootstrap.com/) + Custom SCSS para um design premium e responsivo.
- **Ícones**: [Bootstrap Icons](https://icons.getbootstrap.com/).
- **PDF**: [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/) para exportação de receitas.
- **Package Manager**: [pnpm](https://pnpm.io/) para instalações rápidas e eficientes.

---

## 🏛️ Escolhas Arquiteturais

### 1. Separação de Repositórios (Decoupled Architecture)
Optei por separar o **Frontend** do **Backend**. Isso permite que cada parte do sistema escale de forma independente, facilita a manutenção e permite que diferentes tecnologias sejam usadas em cada ponta. O frontend consome uma API RESTful robusta.

### 2. UI/UX "Premium First"
Diferente de MVPs básicos, este projeto foca em uma experiência visual rica:
- **Split-Screen Authentication**: Telas de login e registro modernas com efeitos de vidro (glassmorphism) e imagens de alta qualidade.
- **Hero Banners**: Banners dinâmicos em cada receita que trazem profundidade visual.
- **Interatividade**: Feedback visual em tempo real, previews de imagens e animações de transição suaves.

---

## 🛠️ Como Rodar o Projeto

### Pré-requisitos
- Node.js (v18+)
- pnpm

### Instalação
```bash
# Instalar dependências
pnpm install
```

### Desenvolvimento
```bash
# Iniciar servidor local
pnpm dev
```
O projeto estará disponível em `http://localhost:3000`.

---

## 🐳 Docker Deployment

Para rodar o projeto em um ambiente containerizado:

```bash
# Build da imagem
docker build -t receitas-frontend .

# Rodar container
docker run -p 3000:3000 receitas-frontend
```

---

## 🛣️ Roadmap / TODO v2

Melhorias planejadas para futuras versões:
- [ ] **Autenticação Social**: Integração com Google e GitHub.
- [ ] **Busca Avançada**: Filtros por ingredientes, tempo de preparo e dificuldade.
- [ ] **Sistema de Avaliação**: Comentários e estrelas em cada receita.
- [ ] **PWA (Progressive Web App)**: Suporte para instalação e uso offline.
- [ ] **Compartilhamento Social**: Botões para WhatsApp, Instagram e Pinterest.

---

Desenvolvido por **Bruno Vicente** como teste técnico.
