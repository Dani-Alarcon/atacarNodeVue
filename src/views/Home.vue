<script setup>
import { ref, watch } from "vue";
import { useFetch } from "@/composables/useFetch";
import PokemonCard from "@/components/PokemonCard.vue";

const cerca = ref('chicken')
const url = ref(`http://localhost:3000/pokemons`)
const { data, loading, error, fetchData } = useFetch(url)

//const emit = defineEmits(['idMeal'])

/*watch(cerca, (recepta) => {
  url.value = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recepta}`
  fetchData()
})*/

</script>

<template>
  

  <h1>Llista de Pokemons</h1>
  <div v-if="loading">Carregant...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>
    <div v-if="data && data.pokemons">
      <PokemonCard v-for="pokemon in data.pokemons" :key="pokemons.id" :pokemon="pokemon" />
    </div>
  </div>


</template>

<style scoped></style>
