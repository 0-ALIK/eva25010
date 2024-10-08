<template>
    <div class="h-[97%] p-space flex flex-col bg-surface-900 border border-surface-800 rounded-lg justify-start gap-6 items-center w-fit fixed">
        <div  class="mr-2 bg-black rounded-full w-44 h-44 align-middle text-center content-center items-center relative">
            <img :src="usuario?.foto || '/user_placeholder.jpg'" alt="Foto de perfil" class="w-full h-full object-cover rounded-full" />
            <div class="absolute w-fit top-0 right-0 m-2">
                <Button icon="pi pi-camera" rounded @click="cambiarFoto" />
            </div>
        </div>
        
        <article class="flex gap-4 bg-primary-400 p-3 rounded-md "> 
            <h4>{{ usuario?.nombre || 'Nombre' }}</h4>
            <h4>{{ usuario?.apellido || 'Apellido' }}</h4>
        </article>
        <h4>{{ usuario?.profesion.nombre || 'Profesión' }}</h4>

        <article class="flex gap-4 ">
            <h4>{{usuario?.cargo || 'Cargo' }}</h4>
        </article>

        <Button label="Editar" @click="editarDatos" icon="pi pi-pen-to-square"></Button>
    
        <EditarUsuario v-model:visible="isVisible" />

        <CambiarFoto v-model:visible="isVisibleCambiarFoto" />

    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import { useAuthStore } from '../../stores/gestion-usuario/auth-store';
import { computed, ref } from 'vue';
import EditarUsuario from './EditarUsuario.vue';
import CambiarFoto from './CambiarFoto.vue';

const authStore = useAuthStore();
const usuario = computed(() => authStore.getUsuario);

const isVisible = ref(false);

const isVisibleCambiarFoto = ref(false);

function editarDatos(){
    isVisible.value = true;
}

function cambiarFoto(){
    isVisibleCambiarFoto.value = true;
}

</script>

