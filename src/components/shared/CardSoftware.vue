<template>
    <div class="w-fit h-fit bg-surface-900 flex rounded-md p-3 gap-4 justify-start items-center border border-surface-800 shadow-2xl ">
        <div class="overflow-hidden rounded-lg ">
            <Image :src="portada" alt="Image" width="200px" preview class=" h-auto"/>
        </div>

        <article class="flex flex-col gap-2" >
            <div class="flex justify-between "><!--Nombre, fecha-->
                <h4>{{ nombre }} </h4>
                <small class="text-gray-500 text-xs">{{ nombreTipo }}  </small>
                <small class="text-gray-500 text-xs"> {{ createdAt }}</small>
            </div>
            <!--Descripción-->
            <p class="line-clamp-3">{{ descripcion }}</p>
            <!--Botones de datos-->
            <div class="text-white flex justify-star gap-4">
                <Badge size="sm" unstyled="true" :value="nombreTipo"      class="text-xs bg-primary p-2 rounded-lg text-black"/>
                <Badge size="sm" unstyled="true" :value="nombreLicencia"  class="text-xs bg-primary p-2 rounded-lg text-black"/>
                <Badge size="sm" unstyled="true" :value="version"         class="text-xs bg-primary p-2 rounded-lg text-black"/>
                <Badge size="sm" unstyled="true" :value="enlace"          class="text-xs bg-primary p-2 rounded-lg text-black"/>
            </div>
        </article>

        <!--Botón acción-->
        <section class="w-fit">
            <Button v-if="sesion" label="editar" icon="pi pi-pen-to-square"/>
            <Button v-else label="evaluar" icon="pi pi-chevron-right"/>
        </section>
    </div>
</template>

<script setup lang="ts">
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Image from 'primevue/image';
import { ref } from 'vue';
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
console.log('Estoy en el componente');

  
const router = useRouter();

const sesion = ref(true);

const props = defineProps({
    id: {
        type: [String, Number],
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    version: {
        type: [String, Number],
        required: true
    },
    portada: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    enlace: {
        type: String,
        required: true
    },
    imagenId: {
        type: [String, Number],
        required: true
    },
    imagenesPreview: {
        type: String,
        required: true
    },
    tipoId: {
        type: [String, Number],
        required: true
    },
    nombreTipo: {
        type: String,
        required: true
    },
    licenciaId: {
        type: [String, Number],
        required: true
    },
    nombreLicencia: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true
    }

});


</script>
