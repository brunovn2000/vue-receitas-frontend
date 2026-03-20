<template>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 g-xl-5">
    <div class="col" v-for="recipe in recipes" :key="recipe.id">
      <RecipeCard :recipe="recipe" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from '~/types/recipe'

defineProps<{
  recipes: Recipe[]
}>()
</script>