<script setup>
import { ref } from "vue";
import { useFetch } from "@/composables/useFetch";
import PokemonCard from "@/components/PokemonCard.vue";

const url = ref(`http://localhost:3000/pokemons`)
const { data, loading, error, fetchData } = useFetch(url)
</script>

<template>
  <h1>Llista de Pokemons</h1>

  <div v-if="loading">Carregant...</div>

  <div v-else-if="error === 'Error en la peticio: 401'">
    <div class="auth-error">
      <h2>Sessió no invalida</h2>
      <p>Has d'iniciar sessió per veure el llistat de Pokémons.</p>
      <RouterLink to="/" class="btn-login">Anar al Login</RouterLink>
    </div>
  </div>

  <div v-else-if="error">{{ error }}</div>

  <div v-else>
    <div v-if="data && data.pokemons">
      <PokemonCard v-for="pokemon in data.pokemons" :key="pokemon.id" :pokemon="pokemon" />
    </div>
    <div v-else-if="data">
       <p>No hi ha pokemons disponibles.</p>
    </div>
  </div>
</template>

<style scoped>
.auth-error {
  border: 2px solid #ff4d4d;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff5f5;
  text-align: center;
  margin-top: 20px;
}
.btn-login {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}
</style>