<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
    pokemon: {
        type: Object,
        required: true
    }
})

const eliminarPokemon = async () => {
    if (!confirm(`Segur que vols eliminar a ${props.pokemon.name}?`)) return
    try {
        const res = await fetch(`http://localhost:3000/pokemons/${props.pokemon.id}`, {
            method: 'DELETE',
            headers: { 'Accept': 'application/json' },
            credentials: 'include'
        })
        if (res.ok) window.location.reload()
    } catch (err) {
        console.error(err)
    }
}
</script>

<template>
    <p>Pokemons</p>
    <div>
        <img :src="props.pokemon.imatge" :alt="props.pokemon.name">
        <h3>{{ props.pokemon.name }}</h3>
        <p>{{ props.pokemon.type }} - {{ props.pokemon.generation }}</p>
    </div>
    <div class="accions">
        <RouterLink :to="{ name: 'pokemonDetail', params: { id: props.pokemon.id } }">Detall</RouterLink>
        <RouterLink :to="{ path: `/pokemon/edit/${props.pokemon.id}` }" class="btn-edit">Editar</RouterLink>
        <button @click="eliminarPokemon" class="btn-delete">Eliminar</button>
    </div>
    <hr>
</template>

<style scoped>
img {
    height: 150px;
}

.accions {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-top: 10px;
}

.btn-delete {
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
}

.btn-edit {
    background-color: #ffc107;
    color: black;
    padding: 5px 10px;
    text-decoration: none;
    border-radius: 4px;
    font-size: 14px;
}
</style>