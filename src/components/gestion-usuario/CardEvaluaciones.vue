<template>
    <div class="w-fit h-fit bg-surface-900 flex rounded-md p-3 gap-4 justify-start items-center border border-surface-800 shadow-2xl ">
        <div class="overflow-hidden rounded-lg w-9/12">
            <Image :src="props.software?.portada || '/bg.jpg'" alt="Image" width="" preview class=" h-auto"/>
        </div>

        <article class="flex flex-col gap-2" >
            <div class="flex justify-start gap-4 "><!--Nombre, fecha-->
                <h4>{{ props.software?.nombre || 'EVA25010' }} </h4>
                <small class="text-gray-500 text-xs">{{ props.software?.subtipoSoftware || 'Aplicación Web' }}  </small>
                <small class="text-gray-500 text-xs"> {{ props.createdAt || '00/00/0000' }}</small>
            </div>
            <!--Descripción-->
            <p class="line-clamp-3">{{ props.comentario?.descripcion || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' }}</p>
 
        </article>

        <!--Botón acción-->
        <section class="w-fit">
            <Badge size="sm" unstyled="true" :value="props.respuestas?.values || '3/5' " class="text-sm bg-primary py-2 px-4 rounded-lg text-surface-900 font-medium"/>
        </section>
    </div>
</template>

<script setup lang="ts">
import Badge from 'primevue/badge';
import Image from 'primevue/image';
import { Evaluacion } from '../../models/evaluacion';

const props = defineProps<Evaluacion>();




</script>
