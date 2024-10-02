<!-- <template>
    <Dialog v-bind:visible="props.visible" modal header="Edit Profile" :style="{ width: '25rem' }">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>

        <div class="flex items-center gap-4 mb-4">
            <label for="username" class="font-semibold w-24">Nombre</label>
            <InputText id="username" v-model="usuario?.nombre" class="flex-auto" autocomplete="off" />
        </div>

        <div class="flex items-center gap-4 mb-8">
            <label for="email" class="font-semibold w-24">Apellido</label>
            <InputText id="email" v-model="usuario?.apellido" class="flex-auto" autocomplete="off" />
        </div>

        <div class="flex items-center gap-4 mb-8">
            <label for="email" class="font-semibold w-24">Profesión</label>
            <InputText id="email" v-model="usuario?.profesion" class="flex-auto" autocomplete="off" />
        </div>

        <div class="flex items-center gap-4 mb-8">
            <label for="email" class="font-semibold w-24">Cargo</label>
            <InputText id="email" v-model="usuario?.cargo" class="flex-auto" autocomplete="off" />
        </div>

        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="cerrarModal"></Button>
            <Button type="button" label="Save" @click="guardarCambios"></Button>
        </div>
    </Dialog>
</template> -->

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { AuthService } from '../../services/gestion-usuario/auth';
import { useToastStore } from '../../stores/shared/toast-store';

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
    console.log('Funciona');
   /* try {
        const formData = new FormData()
        if (formData) {
            formData.append('nombre', usuario.value?.nombre);
            formData.append('apellido', usuario.value?.apellido);
            formData.append('profesion', usuario.value?.profesion);
            formData.append('cargo', usuario.value?.cargo);

        }
        const usuarioService = new AuthService();
        const response = await usuarioService.actualizarDatosUsuario(formData);
        
        if (response) {
            //usuario.value = response;
            console.log('Datos del usuario actualizados:', usuario.value);
            toastStore.showToast('success', 'Éxito', 'Los datos se han actualizado correctamente.');
        } else {
            toastStore.showToast('error', 'Vacío', 'No se pudieron actualizar los datos.');
        }
    } catch (error) {
        toastStore.showToast('error', 'Error', 'Error al actualizar los datos:');
        console.error('Error al cargar las publicaciones:', error);
    }*/

    cerrarModal(); 
}

</script>
