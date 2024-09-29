<template>
    <div class="w-fit h-fit bg-surface-900 flex rounded-md p-3 gap-4 justify-start items-center border border-surface-800 shadow-2xl ">
        <div class="overflow-hidden rounded-lg w-9/12">
            <Image :src="props.portada || '/bg.jpg'" alt="Image" width="" preview class=" h-auto"/>
        </div>

        <article class="flex flex-col gap-2" >
            <div class="flex justify-between "><!--Nombre, fecha-->
                <h4>{{ props.nombre || 'EVA25010' }} </h4>
                <small class="text-gray-500 text-xs">{{ props.subtipoSoftware?.nombre || 'Aplicación Web' }}  </small>
                <small class="text-gray-500 text-xs"> {{ props.createdAt || '00/00/0000' }}</small>
            </div>
            <!--Descripción-->
            <p class="line-clamp-3">{{ props.descripcion || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' }}</p>
            <!--Botones de datos-->
            <div class="text-white flex justify-star gap-4">
                <Badge size="sm" unstyled="true" :value="props.licencia || 'Libre' "  class="text-xs bg-primary p-2 rounded-lg text-black"/>
                <Badge size="sm" unstyled="true" :value="props.version || '0.9'"         class="text-xs bg-primary p-2 rounded-lg text-black"/>
                <Badge size="sm" unstyled="true" :value="props.enlace || 'eva25010.com'"          class="text-xs bg-primary p-2 rounded-lg text-black"/>
            </div>
        </article>

        <!--Botón acción-->
        <section class="w-fit">
            <Button v-if="authStore" label="editar" icon="pi pi-pen-to-square"/>
            <Button v-else label="evaluar" icon="pi pi-chevron-right"/>
        </section>
    </div>
</template>

<script setup lang="ts">
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Image from 'primevue/image';
import { useAuthStore } from '../../stores/gestion-usuario/auth-store';
import { Software } from '../../models/software';

const authStore = useAuthStore();
const props = defineProps<Software>();



</script>
