<script setup>
const props = defineProps({
    pokemon: {
        type: Object,
        require: true
    }

})
</script>

<template>
    <p>Pokemons</p>
    <div>    
        <img :src="props.pokemon.imatge" :alt="props.pokemon.name">
        <h3>{{ props.pokemon.name }}</h3>
        <p>{{ props.pokemon.type }} - {{ props.pokemon.generation }}</p>
    </div>
    <RouterLink :to="{ name: 'pokemonDetail', params: { id: props.pokemon.id } }">Pokemon</RouterLink>
    
    <hr>


</template>

<style scoped>
img {
    height: 150px;
}
</style>