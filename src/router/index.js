import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/Home.vue') },
    { path: '/pokemons', name: 'pokemons', component: () => import('@/views/Pokemons.vue') },
    { path: '/pokemon/:id', name: 'pokemonDetail', component: () => import('@/views/PokemonDetail.vue') },
    { path: '/pokemon/create', name: 'createPokemon', component: () => import('@/views/CreatePokemon.vue') },
    { path: '/pokemon/edit/:id', name: 'editPokemon', component: () => import('@/views/EditPokemon.vue') }
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user_logged') === 'true';

  if (to.name !== 'home' && !isAuthenticated) {
    alert('Cal iniciar sessió per accedir a aquesta secció');
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router