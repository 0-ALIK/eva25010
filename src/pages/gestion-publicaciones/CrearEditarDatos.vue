<template>
    <div>
        <div class="flex gap-4 justify-between">
            <form class="w-full flex flex-col gap-5">
                <FloatLabel class="w-full">
                    <InputText id="nombre" class="w-full"/>
                    <label for="nombre">Nombre</label>
                </FloatLabel>    
    
                <FloatLabel class="w-full">
                    <InputText id="version" class="w-full"/>
                    <label for="version">Version</label>
                </FloatLabel>    
    
                <FloatLabel>
                    <Textarea class="w-full h-28 resize-none"/>
                    <label>Descripcion</label>
                </FloatLabel>
    
                <div>
                    <Select v-model="licencia" :options="licencias" optionLabel="nombre" placeholder="Licencia" class="w-full" />
                </div>
    
                <div class="flex gap-2">
                    <Select v-model="tipo" :options="tipos" optionLabel="nombre" placeholder="Tipo" class="w-full" />
                    <Select v-model="subtipo" :options="subtipos" optionLabel="nombre" placeholder="Subtipo" class="w-full" />
                </div>
    
                <div>
                    <MultiSelect v-model="tecnologiasSeleccionadas" :options="tecnologias" optionLabel="nombre" filter placeholder="Tecnologias" :maxSelectedLabels="3" class="w-full" />
                </div>
            </form>
            
            <div class="w-full">
                <div class="mb-10">
                    <h3>Portada</h3>
                    <FileUpload @select="onSelectPortada" mode="basic" name="demo[]" accept="image/*" :maxFileSize="1000000" class="block"/>
                </div>

                <div>
                    <h3>Imagenes</h3>
                    <FileUpload name="demo[]" url="/api/upload"  :multiple="true" accept="image/*" :maxFileSize="1000000">
                        <template #empty>
                            <span>Drag and drop files to here to upload.</span>
                        </template>
                    </FileUpload>
                </div>
            </div>
        </div>

        <div class="flex justify-center mt-10">
            <Button label="Siguiente" icon="pi pi-arrow-right" @click="onSiguienteClick" />
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
import { ref } from 'vue';

const emit = defineEmits<{
    (e: 'siguiente'): void;
}>();

const licencias = ref([
    { nombre: 'Licencia 1', version: '1.0', descripcion: 'Descripcion 1' },
    { nombre: 'Licencia 2', version: '2.0', descripcion: 'Descripcion 2' },
    { nombre: 'Licencia 3', version: '3.0', descripcion: 'Descripcion 3' },
    { nombre: 'Licencia 4', version: '4.0', descripcion: 'Descripcion 4' },
    { nombre: 'Licencia 5', version: '5.0', descripcion: 'Descripcion 5' },
]);

const tipos = ref([
    { nombre: 'Tipo 1', version: '1.0', descripcion: 'Descripcion 1' },
    { nombre: 'Tipo 2', version: '2.0', descripcion: 'Descripcion 2' },
    { nombre: 'Tipo 3', version: '3.0', descripcion: 'Descripcion 3' },
    { nombre: 'Tipo 4', version: '4.0', descripcion: 'Descripcion 4' },
    { nombre: 'Tipo 5', version: '5.0', descripcion: 'Descripcion 5' },
]);

const subtipos = ref([
    { nombre: 'Subtipo 1', version: '1.0', descripcion: 'Descripcion 1' },
    { nombre: 'Subtipo 2', version: '2.0', descripcion: 'Descripcion 2' },
    { nombre: 'Subtipo 3', version: '3.0', descripcion: 'Descripcion 3' },
    { nombre: 'Subtipo 4', version: '4.0', descripcion: 'Descripcion 4' },
    { nombre: 'Subtipo 5', version: '5.0', descripcion: 'Descripcion 5' },
]);

const tecnologias = ref([
    { nombre: 'Tecnologia 1', version: '1.0', descripcion: 'Descripcion 1' },
    { nombre: 'Tecnologia 2', version: '2.0', descripcion: 'Descripcion 2' },
    { nombre: 'Tecnologia 3', version: '3.0', descripcion: 'Descripcion 3' },
    { nombre: 'Tecnologia 4', version: '4.0', descripcion: 'Descripcion 4' },
    { nombre: 'Tecnologia 5', version: '5.0', descripcion: 'Descripcion 5' },
]);

const licencia = ref(null);

const tipo = ref(null);

const subtipo = ref(null);

const tecnologiasSeleccionadas = ref([]);

function onSiguienteClick() {
    emit('siguiente');
}

function onSelectPortada(event: any) {
    console.log(event);
}
</script>