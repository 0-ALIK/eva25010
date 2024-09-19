import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";
import { Usuario } from "../../models/usuario";

export const useAuthStore = defineStore('auth', () => {
    const usuario = ref<Usuario | null>(null);

    const token = ref<string | null>(null);

    const getUsuario = computed(() => usuario.value);

    const getToken = computed(() => token.value);
    
    function setUsuario(newUser: Usuario): void {
        usuario.value = newUser;
        localStorage.setItem('usuario', JSON.stringify(newUser));
    }

    function setToken(newToken: string): void {
        token.value = newToken;
        localStorage.setItem('token', newToken);
    }

    function logout(): void {
        usuario.value = null;
        token.value = null;
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
    }

    onMounted(() => {
        const userString = localStorage.getItem('usuario');
        const tokenString = localStorage.getItem('token');

        if (userString && tokenString) {
            usuario.value = JSON.parse(userString);
            token.value = tokenString;
        }
    });

    return {
        setUsuario,
        setToken,
        logout,
        getUsuario,
        getToken
    }
});