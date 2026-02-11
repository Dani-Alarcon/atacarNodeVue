<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
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

        if (!res.ok) {
            // Intentem llegir el missatge d'error del servidor
            const errorData = await res.text();
            throw new Error(`Error ${res.status}: ${errorData}`);
        }

        await res.json();
        router.push('/pokemons');
        
    } catch (err) {
        error.value = err.message;
        console.error("Error al frontend:", err);
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
            
            <p v-if="error" class="error">{{ error }}</p>
        </form>
        
        <RouterLink to="/pokemons">Tornar al llistat</RouterLink>
    </div>
</template>

<style scoped>
.create-container { max-width: 400px; margin: 0 auto; padding: 20px; }
.form-group { margin-bottom: 15px; display: flex; flex-direction: column; }
.error { color: red; margin-top: 10px; }
button { padding: 10px; background-color: #28a745; color: white; border: none; cursor: pointer; }
button:disabled { background-color: #ccc; }
</style>