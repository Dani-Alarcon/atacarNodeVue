<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const error = ref(null)
const enviant = ref(false)

const pokemon = ref({
    name: '',
    type: '',
    generation: '',
    imatge: ''
})

const carregarPokemon = async () => {
    try {
        const res = await fetch(`http://localhost:3000/pokemons/${route.params.id}`, {
            headers: { 'Accept': 'application/json' },
            credentials: 'include'
        })
        if (!res.ok) throw new Error('No s’ha pogut carregar el Pokémon')
        const data = await res.json()
        pokemon.value = data
    } catch (err) {
        error.value = err.message
    }
}

const editarPokemon = async () => {
    enviant.value = true
    try {
        await fetch(`http://localhost:3000/pokemons/${route.params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(pokemon.value),
            credentials: 'include'
        })

        // Forzamos recarga completa hacia la lista
        window.location.href = '/pokemons'
    } catch (err) {
        // Ante el "Failed to fetch", forzamos igualmente la vuelta
        window.location.href = '/pokemons'
    } finally {
        enviant.value = false
    }
}

onMounted(carregarPokemon)
</script>

<template>
    <div class="edit-container">
        <h1>Editar Pokémon</h1>
        <form v-if="pokemon.name" @submit.prevent="editarPokemon">
            <div class="form-group">
                <label>Nom:</label>
                <input v-model="pokemon.name" type="text" required>
            </div>
            <div class="form-group">
                <label>Tipus:</label>
                <input v-model="pokemon.type" type="text" required>
            </div>
            <div class="form-group">
                <label>Generació:</label>
                <input v-model="pokemon.generation" type="number" required>
            </div>
            <div class="form-group">
                <label>URL Imatge:</label>
                <input v-model="pokemon.imatge" type="text">
            </div>
            <button type="submit" :disabled="enviant">
                {{ enviant ? 'Guardant...' : 'Guardar Canvis' }}
            </button>
        </form>
        <p v-if="error" class="error">{{ error }}</p>
        <RouterLink to="/pokemons">Cancel·lar</RouterLink>
    </div>
</template>

<style scoped>
.edit-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
}

button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}
</style>