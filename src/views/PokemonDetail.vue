<script setup>
import { useRoute } from 'vue-router'
import { ref, watch, computed } from 'vue'
import { useFetch } from "@/composables/useFetch";

const route = useRoute()

const url = ref(
    `http://localhost:3000/pokemons/${route.params.id}`
)

const { data, loading, error, fetchData } = useFetch(url)

watch(
    () => route.params.id,
    (newId) => {
        url.value = `http://localhost:3000/pokemons/${newId}`
        fetchData()
    }
)

const pokemon = computed(() => {
    if (data.value) {
        return data.value;
    } else {
        return null;
    }
});
</script>

<template>
    <div v-if="loading">Carregant...</div>
    <div v-else-if="error">{{ error }}</div>

    <div v-else>
        <div v-if="pokemon">
            <img :src="pokemon.imatge" :alt="pokemon.name">
            <h1>Pokemon Detall: {{ pokemon.name }}</h1>
            <h1>Tipus:</h1>
            <p>{{ pokemon.type }}</p>
            <h1>Generacio:</h1>
            <p>{{ pokemon.generation }}</p>
        </div>
        <div v-else>
            Pokemon no trobat
        </div>
    </div>
</template>

<style scoped>
img {
    height: 300px;
}
</style>