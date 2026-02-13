<script setup>
import { ref } from 'vue';

const loginData = ref({ username: '', password: '' });
const registerData = ref({ username: '', password: '', confirm: '' });
const message = ref({ text: '', color: '' });

const setMsg = (msg, color) => {
  message.value = { text: msg, color: color };
};

const handleResponse = async (res, successMsg) => {
  if (res.ok) {
    setMsg(successMsg, 'green');
    localStorage.setItem('user_logged', 'true');
    setTimeout(() => window.location.href = '/pokemons', 1500);
  } else {
    const errorText = await res.text();
    setMsg(`Error: ${errorText || 'Operació fallida'}`, 'red');
  }
};

const login = async () => {
  try {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData.value),
      credentials: 'include'
    });
    await handleResponse(res, 'Sessió iniciada... Entrant...');
  } catch (err) {
    setMsg('Error de connexió', 'red');
  }
};

const register = async () => {
  if (registerData.value.password !== registerData.value.confirm) {
    alert('Les contrasenyes no coincideixen');
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username: registerData.value.username, 
        password: registerData.value.password 
      }),
      credentials: 'include'
    });
    await handleResponse(res, 'Usuari registrat... Entrant...');
  } catch (err) {
    setMsg('Error de connexió', 'red');
  }
};
</script>

<template>
  <div class="container">
    <div class="forms-wrapper">
      <div class="form-container">
        <form @submit.prevent="login">
          <h2>Inicia sessió</h2>
          <label>Nom d'usuari:</label>
          <input v-model="loginData.username" type="text" required>
          <label>Contrasenya:</label>
          <input v-model="loginData.password" type="password" required>
          <button type="submit">Entra</button>
        </form>
      </div>

      <div class="form-container">
        <form @submit.prevent="register">
          <h2>Registra't</h2>
          <label>Nom d'usuari:</label>
          <input v-model="registerData.username" type="text" required>
          <label>Contrasenya:</label>
          <input v-model="registerData.password" type="password" required>
          <label>Confirmar contrasenya:</label>
          <input v-model="registerData.confirm" type="password" required>
          <button type="submit">Crea el compte</button>
        </form>
      </div>
    </div>
    <p :style="{ color: message.color }">{{ message.text }}</p>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 50px;
}

.forms-wrapper {
  display: flex;
  gap: 40px;
}

.form-container {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #3aa876;
}
</style>