<template>
    <div>
        <div class="flex gap-4 justify-between">
            <form class="w-full flex flex-col gap-5">
                <FloatLabel class="w-full">
                    <InputText v-model="datos.nombre" id="nombre" class="w-full"/>
                    <label for="nombre">Nombre</label>
                </FloatLabel>    
    
                <FloatLabel class="w-full">
                    <InputText v-model="datos.version" id="version" class="w-full"/>
                    <label for="version">Version</label>
                </FloatLabel>    
    
                <FloatLabel>
                    <Textarea v-model="datos.descripcion"  class="w-full h-28 resize-none"/>
                    <label>Descripcion</label>
                </FloatLabel>
    
                <div>
                    <Select v-model="datos.licencia" :options="licencias" :loading="licencias.length === 0" optionLabel="nombre" placeholder="Licencia" class="w-full" />
                </div>
    
                <div class="flex gap-2">
                    <Select v-model="tipo" :options="tipos" :loading="tipos.length === 0" optionLabel="nombre" placeholder="Tipo" @change="onTipoChange"  class="w-full" />
                    <Select v-model="datos.subtipoSoftware" :options="subtipos" :loading="subtipos.length === 0" optionLabel="nombre" placeholder="Subtipo" class="w-full" />
                </div>
    
                <div>
                    <MultiSelect v-model="datos.tecnologias" :options="tecnologias" :loading="tecnologias.length === 0" optionLabel="nombre" filter placeholder="Tecnologias" :maxSelectedLabels="3" class="w-full" />
                </div>
            </form>
            
            <div class="w-full">
                <div class="mb-10">
                    <h3>Portada</h3>
                    <FileUpload @select="onSelectPortada" mode="basic" accept="image/*" :maxFileSize="1000000" class="block"/>
                </div>

                <div>
                    <h3>Imagenes</h3>
                    <FileUpload @select="onSelectImagenes" @remove="onRemoveImagen" :multiple="true" accept="image/*" :maxFileSize="1000000" :show-cancel-button="false" :show-upload-button="false">
                        <template #empty>
                            <span>Drag and drop files to here to upload.</span>
                        </template>
                    </FileUpload>
                </div>
            </div>
        </div>

        <div class="flex justify-center mt-10">
            <Button label="Siguiente" icon="pi pi-arrow-right" @click="onSiguienteClick" :disabled="vuelidate.$invalid"/>
        </div>
            
    </div>
</template>

<script setup lang="ts">
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Select from 'primevue/select';
import MultiSelect from 'primevue/multiselect';
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';
import { onMounted, ref, watchEffect } from 'vue';
import { maxLength, minLength, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { Licencia } from '../../models/licencia';
import { TipoSoftware } from '../../models/tipo_software';
import { SubtipoSoftware } from '../../models/subtipo_software';
import { PublicacionesService } from '../../services/gestion-publicaciones/publicaciones';
import { Tecnologia } from '../../models/tecnologia';
import { usePublicacionStore } from '../../stores/gestion-publicaciones/publicacion-store';
import { Software } from '../../models/software';

const props = defineProps<{
    software: Software | null;
}>();

const emit = defineEmits<{
    (e: 'siguiente'): void;
}>();

const publicacionesService = new PublicacionesService();

const licencias = ref<Licencia[]>([]);

const tipos = ref<TipoSoftware[]>([]);

const subtipos = ref<SubtipoSoftware[]>([]);

const tecnologias = ref<Tecnologia[]>([]);

const tipo = ref(null);

const datos = ref({
    nombre: props.software?.nombre || '',
    version: props.software?.version || '',
    descripcion: props.software?.descripcion || '',
    licencia: null,
    subtipoSoftware: '',
    tecnologias: [],
    portada: null,
    imagenesPreview: []
});

const reglas = {
    nombre: { required, minLength: minLength(2), maxLength: maxLength(100) },
    version: { required, maxLength: maxLength(20) },
    descripcion: { required },
    licencia: { required },
    subtipoSoftware: { required },
    tecnologias: { required },
    portada: { required },
    imagenesPreview: { required }
};

const vuelidate = useVuelidate(reglas, datos);

const publicacionStore = usePublicacionStore();

function onSiguienteClick() {
    const licencia: any = datos.value.licencia;
    const subtipo: any = datos.value.subtipoSoftware;
    const tecnologias: any = datos.value.tecnologias;

    const datosFormatted = {
        ...datos.value,
        licencia: licencia.id,
        subtipoSoftware: subtipo.id,
        tecnologias: tecnologias.map((t: any) => t.id)
    };

    console.log(datosFormatted);
    

    publicacionStore.setPublicacion(datosFormatted);
    emit('siguiente');
}

function onSelectPortada(event: any) {
    datos.value.portada = event.files[0];
}

function onSelectImagenes(event: any) {
    datos.value.imagenesPreview = event.files;
}

function onRemoveImagen(event: any) {
    datos.value.imagenesPreview = event.files;
}

async function onTipoChange(event: any) {
    subtipos.value = [];
    subtipos.value = await publicacionesService.obtenerSubtipos(event.value.id) || [];
}

onMounted(async () => {
    licencias.value = await publicacionesService.obtenerLicencias() || [];
    tipos.value = await publicacionesService.obtenerTipos() || [];
    tecnologias.value = await publicacionesService.obtenerTecnologias() || [];
});

watchEffect(() => {
    datos.value.nombre = props.software?.nombre || '';
    datos.value.version = props.software?.version || '';
    datos.value.descripcion = props.software?.descripcion || '';
    
});
</script>