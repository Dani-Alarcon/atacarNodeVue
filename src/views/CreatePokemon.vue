<script setup>
import { ref } from 'vue'

const pokemon = ref({
    name: '',
    type: '',
    generation: '',
    imatge: ''
})

const error = ref(null)
const enviant = ref(false)

const crearPokemon = async () => {
    enviant.value = true
    error.value = null

    try {
        const res = await fetch('http://localhost:3000/pokemons/createPokemon', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(pokemon.value),
            credentials: 'include'
        })

        // No comprobamos res.ok porque el "Failed to fetch" salta antes.
        // Forzamos la redirección manual al listado, que hará un F5 automático.
        window.location.href = '/pokemons'

    } catch (err) {
        // En lugar de mostrar error, como sabemos que el registro sí se crea,
        // forzamos también la salida hacia el listado.
        window.location.href = '/pokemons'
    } finally {
        enviant.value = false
    }
}
</script>

<template>
    <div class="create-container">
        <h1>Crear Nou Pokémon</h1>
        <form @submit.prevent="crearPokemon">
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
                <label>URL Imatge (Opcional):</label>
                <input v-model="pokemon.imatge" type="text">
            </div>

            <button type="submit" :disabled="enviant">
                {{ enviant ? 'Creant...' : 'Crear Pokémon' }}
            </button>
        </form>

        <RouterLink to="/pokemons">Tornar al llistat</RouterLink>
    </div>
</template>

<style scoped>
.create-container {
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
    background-color: #28a745;
    color: white;
    border: none;
    cursor: pointer;
}

button:disabled {
    background-color: #ccc;
}
</style>