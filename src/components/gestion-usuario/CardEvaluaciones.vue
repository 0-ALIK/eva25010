<template>
    <div class="w-fit h-fit bg-surface-900 flex rounded-md p-3 gap-4 justify-start items-center border border-surface-800 shadow-2xl ">
        <div class="overflow-hidden rounded-lg w-9/12">
            <Image :src="props.software?.portada" alt="Image" width="" preview class=" h-auto"/>
        </div>

        <article class="flex flex-col gap-2" >
            <div class="flex justify-start gap-4 "><!--Nombre, fecha-->
                <h4>{{ props.software?.nombre }} </h4>
                <small class="text-gray-500 text-xs">{{ props.software?.subtipoSoftware }}  </small>
                <small class="text-gray-500 text-xs"> {{ props.createdAt }}</small>
            </div>
            <!--Descripción-->
            <p class="line-clamp-3">{{ props.comentario?.descripcion }}</p>
 
        </article>

        <!--Botón acción-->
        <section class="w-fit">
            <Badge size="sm" unstyled="true" :value="props.respuestas?.values" class="text-sm bg-primary py-2 px-4 rounded-lg text-surface-900 font-medium"/>
        </section>
    </div>
</template>

<script setup lang="ts">
import Badge from 'primevue/badge';
import Image from 'primevue/image';
import { Evaluacion } from '../../models/evaluacion';

const props = defineProps<Evaluacion>();




</script>
