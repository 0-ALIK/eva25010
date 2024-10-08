<template>
    <Dialog :visible="props.visible" modal header="Edit Profile" :style="{ width: '25rem' }">
        <div class="mb-10">
            <h3>Portada</h3>
            <FileUpload @select="onSelectPortada" mode="basic" accept="image/*" :maxFileSize="1000000" class="block"/>
        </div>

        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="cerrarModal"></Button>
            <Button type="button" label="Save" @click="guardarCambios" :disabled="!foto" ></Button>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';
import { ref } from 'vue';
import { AuthService } from '../../services/gestion-usuario/auth';
import { useToastStore } from '../../stores/shared/toast-store';

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits(['update:visible']);

const toast = useToastStore();

const authService = new AuthService();

const foto = ref<File | null>(null);

function onSelectPortada(e: { originalEvent: Event, files: File[] }) {
    foto.value = e.files[0];
}

function cerrarModal() {
    emit('update:visible', false);
}

async function guardarCambios() {
    const formData = new FormData();
    formData.append('foto', foto.value);
    const response = await authService.cambiarFoto(formData);    

    if (response) {
        toast.showToast('success', 'Foto actualizada', 'La foto de perfil ha sido actualizada correctamente');
        emit('update:visible', false);
    } else {
        toast.showToast('error', 'Error', 'No se pudo actualizar la foto de perfil');
    }
}

</script>
