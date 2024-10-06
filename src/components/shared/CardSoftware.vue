<template>
    <RouterLink :to="'/software/'+props.software.id">
        <div class="bg-surface-900 flex rounded-md p-3 gap-4 justify-start items-center border border-surface-800 shadow-2xl w-full">
            <div class="overflow-hidden rounded-lg w-60 h-44 flex-shrink-0">
                <img :src="props.software.portada" alt="Image" class="w-full h-full object-cover" />
            </div>


            <article class="flex flex-col gap-2 w-full">
                <div class="flex justify-between items-center"><!--Nombre, fecha-->
                    <h4 class="font-bold">{{ props.software.nombre }} </h4>
                    <small class="opacity-25 text-xs">{{ props.software.subtipoSoftware?.nombre }}  </small>
                    <small class="opacity-25 font-bold"> {{ fecha.formatoFecha(props.software.createdAt.toString()) }}</small>
                </div>
                <!--Descripción-->
                <p class="line-clamp-3">{{ formatDescripcion(props.software.descripcion) }}</p>
                <!--Botones de datos-->
                <div class="text-white flex justify-star">
                    <Tag icon="pi pi-bookmark" :value="props.software.version" class="mr-1"></Tag>
                    <Tag icon="pi pi-id-card" severity="secondary" :value="props.software.licencia?.nombre" class="mr-1"></Tag>
                </div>
            </article>

            <div class="flex-shrink-0" v-if="usuarioVisible">
                <Usuario :usuario="props.software.usuario" />
            </div>
        </div>
    </RouterLink>
</template>

<script setup lang="ts">
import Tag from 'primevue/tag';
import Usuario from './Usuario.vue';
import { Software } from '../../models/software';
import { useFecha } from '../../composables/shared/fechas';

const fecha = useFecha();

const props = withDefaults(defineProps<{
    software: Software;
    usuarioVisible?: boolean;
}>(), {
   usuarioVisible: true 
});

function formatDescripcion(descripcion: string): string {
    return descripcion.length > 200 ? descripcion.slice(0, 100) + '...' : descripcion;
}

</script>
