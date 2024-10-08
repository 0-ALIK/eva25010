<template>
    <Dialog :visible="props.visible" modal header="Edit Profile" :style="{ width: '25rem' }">
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
            <Select v-model="usuario.profesion" :options="profesiones" optionLabel="nombre" placeholder="Profesiones" class="w-full md:w-56" />
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
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { AuthService } from '../../services/gestion-usuario/auth';
import { useToastStore } from '../../stores/shared/toast-store';
import Select from 'primevue/select';
import { useAuthStore } from '../../stores/gestion-usuario/auth-store';
import { Profesion } from '../../models/profesion';

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits(['update:visible']);

const authService = new AuthService();

const usuario = ref({
    nombre: '',
    apellido: '',
    profesion: null,
    cargo: ''
});

const profesiones = ref<Profesion[]>([]);

const toastStore = useToastStore();

function cerrarModal() {
    emit('update:visible', false);
}

async function guardarCambios() {

    const formdata = new FormData();

    if(usuario.value.nombre.trim() !== ''){
        formdata.append('nombre', usuario.value.nombre);
    }

    if(usuario.value.apellido.trim() !== ''){
        formdata.append('apellido', usuario.value.apellido);
    }

    if(usuario.value.profesion){
        formdata.append('profesionId', usuario.value.profesion.id.toString());
    }

    if(usuario.value.cargo.trim() !== ''){
        formdata.append('cargo', usuario.value.cargo);
    }

    const response = await authService.actualizarDatosUsuario(formdata);

    if(response){
        toastStore.showToast('success', 'Datos actualizados', 'Los datos del usuario han sido actualizados correctamente');
        emit('update:visible', false);
    } else {
        toastStore.showToast('error', 'Error', 'No se pudieron actualizar los datos del usuario');
    }

    cerrarModal(); 
}

onMounted(async () => {

    const authStore = useAuthStore();
    const usuarioAuth = authStore.getUsuario;

    usuario.value.nombre = usuarioAuth.nombre || '';
    usuario.value.apellido = usuarioAuth.apellido || '';
    usuario.value.profesion = usuarioAuth.profesion;
    usuario.value.cargo = usuarioAuth.cargo || '';

    profesiones.value = await authService.obtenerProfesiones();
});
</script>
