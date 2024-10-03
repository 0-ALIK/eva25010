<template>
    <Dialog v-bind:visible="props.visible" modal header="Edit Profile" :style="{ width: '25rem' }">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>

        <div class="flex items-center gap-4 mb-4">
            <label for="username" class="font-semibold w-24">Nombre</label>
            <InputText id="username" v-model="usuario.nombre" class="flex-auto" autocomplete="off" />
        </div>

        <div class="flex items-center gap-4 mb-8">
            <label for="email" class="font-semibold w-24">Apellido</label>
            <InputText id="email" v-model="usuario.apellido" class="flex-auto" autocomplete="off" />
        </div>

        <div class="flex items-center gap-4 mb-8">
            <label for="email" class="font-semibold w-24">Profesión</label>
            <InputText id="email" v-model="usuario.profesion" class="flex-auto" autocomplete="off" />
        </div>

        <div class="flex items-center gap-4 mb-8">
            <label for="email" class="font-semibold w-24">Cargo</label>
            <InputText id="email" v-model="usuario.cargo" class="flex-auto" autocomplete="off" />
        </div>

        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="cerrarModal"></Button>
            <Button type="button" label="Save" @click="guardarCambios"></Button>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { AuthService } from '../../services/gestion-usuario/auth';
import { useToastStore } from '../../stores/shared/toast-store';
import { useAuthStore } from '../../stores/gestion-usuario/auth-store';

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits(['update:visible']);
const usuario = ref({
    nombre: '',
    apellido: '',
    profesion: '',
    cargo: ''
});

const toastStore = useToastStore();

function cerrarModal() {
    emit('update:visible', false);
}

async function guardarCambios() {
    try {
        console.log('Funciona');

        const authStore = useAuthStore();
        const usuario = authStore.getUsuario; // Asegúrate de que esto esté bien definido
        const usuarioData = usuario ? usuario : {}; // Agrega una verificación aquí
        const usuarioService = new AuthService();
        const formData = new FormData();
        formData.append('nombre', usuarioData.nombre || '');
        formData.append('apellido', usuarioData.apellido || '');
        formData.append('profesion', usuarioData.profesion?.nombre || '');
        formData.append('cargo', usuarioData.cargo || '');
        console.log('Formulario de datos antes de enviar:', formData);

        const response = await usuarioService.actualizarDatosUsuario(formData);
        console.log(authStore.getUsuario);
        console.log('response: ', response);
        console.log('Respuesta después de la llamada al servicio:', response);
 // Asegúrate de ver qué está retornando

        if (response) {
            
            authStore.setUsuario(response); 
            toastStore.showToast('success', 'Éxito', 'Los datos se han actualizado correctamente.');
            console.log('Funciona');
            console.log(authStore.getUsuario);

        } else {
            toastStore.showToast('error', 'Error', 'No se pudieron actualizar los datos.');
        }
    } catch (error) {
        toastStore.showToast('error', 'Error', 'Error al actualizar los datos.');
        console.error('Error al cargar los datos:', error);
    }

    cerrarModal(); 
}


</script>
