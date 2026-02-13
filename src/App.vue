<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const isLogged = ref(false)

// Comprovem l'estat en muntar el component
onMounted(() => {
  isLogged.value = localStorage.getItem('user_logged') === 'true'
})

const logout = async () => {
  try {
    await fetch('http://localhost:3000/logout', {
      method: 'POST',
      credentials: 'include'
    })
    localStorage.removeItem('user_logged')
    isLogged.value = false
    window.location.href = '/'
  } catch (err) {
    console.error("Error al tancar sessió", err)
  }
}
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/pokemons">Pokemons</RouterLink> |
      <RouterLink to="/pokemon/create">Crear Pokemon</RouterLink>

      <button v-if="isLogged" @click="logout" class="btn-logout">Tancar Sessió</button>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
.btn-logout {
  margin-left: 20px;
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
}
</style>