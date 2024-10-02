<template>
    <Dialog v-bind:visible="props.visible" modal header="Edit Profile" :style="{ width: '25rem' }" @hide="cerrarModal">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>

        <div class="flex items-center gap-4 mb-4">
            <label for="nombre" class="font-semibold w-24">Nombre</label>
            <InputText id="nombre" v-model="usuarioLocal.nombre" class="flex-auto" autocomplete="off" />
        </div>

        <div class="flex items-center gap-4 mb-8">
            <label for="apellido" class="font-semibold w-24">Apellido</label>
            <InputText id="apellido" v-model="usuarioLocal.apellido" class="flex-auto" autocomplete="off" />
        </div>

        <div class="flex items-center gap-4 mb-8">
            <label for="profesion" class="font-semibold w-24">Profesión</label>
            <InputText id="profesion" v-model="usuarioLocal.profesion" class="flex-auto" autocomplete="off" />
        </div>

        <div class="flex items-center gap-4 mb-8">
            <label for="cargo" class="font-semibold w-24">Cargo</label>
            <InputText id="cargo" v-model="usuarioLocal.cargo" class="flex-auto" autocomplete="off" />
        </div>

        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="cerrarModal"></Button>
            <Button type="button" label="Save" @click="guardarCambios"></Button>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { AuthService } from '../../services/gestion-usuario/auth';
import { useToastStore } from '../../stores/shared/toast-store';

const props = defineProps<{ visible: boolean; usuario: { nombre: string; apellido: string; profesion: string; cargo: string } }>();
const emit = defineEmits(['update:visible', 'updateUsuario']);

const usuarioLocal = ref({ ...props.usuario }); // Copia local para modificar

const toastStore = useToastStore();

// Sincroniza los cambios en las props
watch(() => props.usuario, (newUsuario) => {
  usuarioLocal.value = { ...newUsuario };
});

function cerrarModal() {
    emit('update:visible', false);
}

async function guardarCambios() {
    try {
        const formData = new FormData();
        formData.append('nombre', usuarioLocal.value.nombre);
        formData.append('apellido', usuarioLocal.value.apellido);
        formData.append('profesion', usuarioLocal.value.profesion);
        formData.append('cargo', usuarioLocal.value.cargo);

        const usuarioService = new AuthService();
        const response = await usuarioService.actualizarDatosUsuario(formData);
        
        if (response) {
            // Emitir el evento para actualizar los datos del usuario en el componente padre
            emit('updateUsuario', usuarioLocal.value);
            toastStore.showToast('success', 'Éxito', 'Los datos se han actualizado correctamente.');
        } else {
            toastStore.showToast('error', 'Vacío', 'No se pudieron actualizar los datos.');
        }
    } catch (error) {
        toastStore.showToast('error', 'Error', 'Error al actualizar los datos:');
        console.error('Error al actualizar los datos:', error);
    }

    cerrarModal();
}
</script>
