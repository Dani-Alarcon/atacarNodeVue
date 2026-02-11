<script setup>
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
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'include'
        })

        if (res.ok) {
            window.location.reload()
        } else {
            alert('Error en eliminar el pokemon')
        }
    } catch (err) {
        console.error(err)
        alert('Error de connexió')
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
        <RouterLink :to="{ name: 'pokemonDetail', params: { id: props.pokemon.id } }">Detall Pokemon</RouterLink>
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
    border-radius: 4px;
}
.btn-delete:hover {
    background-color: #cc0000;
}
</style>