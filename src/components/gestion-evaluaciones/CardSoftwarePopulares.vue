<template>
    <div class="flex items-center justify-start h-fit w-full gap-2">
        <section class="bg-surface-800 flex flex-col items-center rounded-lg p-4 gap-2 h-fit w-1/4">
        <h4>Nombre del software</h4>
        <Image :src="props.portada" :alt="props.nombre" width="" preview />
    </section>
    
    <Card style=" overflow: hidden" class="p- w-full h-fit">
        <template #content class="flex justify-center">
            <section class="flex justify-start gap-4 items-center">
                <Avatar :image="props.usuario?.foto" class="mr-2" size="xlarge" shape="circle" />
                <h3 class="text-primary-400 font-medium"> {{ props.usuario?.nombre }} {{ props.usuario?.apellido }}</h3>
                <Badge :unstyled="true" class="text-surface-950 font-normal bg-primary-400 p-2 rounded-lg" size="xlarge" :value="props.subtipoSoftware"></Badge>
                <Badge :unstyled="true" class="text-surface-950 font-normal bg-primary-400 p-2 rounded-lg" size="xlarge" :value="props.version"></Badge>
            </section>

            <p class="line-clamp-3 m-2">{{ props.descripcion }}</p>
        </template>

        <template #footer class="flex justify-between">
            <div class="flex justify-between ">
                <Button as="router-link" label="Ver más"  to="`/gestion-publicaciones/software/${props.id}`" severity=""  class="w-fit bg-primary-500" icon="pi pi-chevron-right" icon-pos="right"/>

            </div>
        </template>
    </Card>

   </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Image from 'primevue/image';
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';
import { Software } from '../../models/software';

const props = defineProps<Software>();

</script>