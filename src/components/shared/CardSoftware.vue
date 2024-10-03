<template>
    <div  class="w-fit h-fit bg-surface-900 flex rounded-md p-3 gap-4 justify-start items-center border border-surface-800 shadow-2xl ">
        <RouterLink :to="'/software'">

            <div class="overflow-hidden rounded-lg w-9/12">
                <Image :src="props.portada" alt="Image" width="" preview class=" h-auto"/>
            </div>

            <article class="flex flex-col gap-2" >
                <div class="flex justify-between "><!--Nombre, fecha-->
                    <h4>{{ props.nombre }} </h4>
                    <small class="text-gray-500 text-xs">{{ props.subtipoSoftware?.nombre }}  </small>
                    <small class="text-gray-500 text-xs"> {{ props.createdAt }}</small>
                </div>
                <!--Descripción-->
                <p class="line-clamp-3">{{ props.descripcion }}</p>
                <!--Botones de datos-->
                <div class="text-white flex justify-star gap-4">
                    <Badge size="sm" :unstyled="true" :value="props.licencia?.nombre" class="text-xs bg-primary p-2 rounded-lg text-black"/>
                    <Badge size="sm" :unstyled="true" :value="props.version" class="text-xs bg-primary p-2 rounded-lg text-black"/>
                </div>
            </article>
            <!--Botón acción-->
            <section class="w-fit">
                <Button v-if="authStore && route.path === '/perfil' " label="editar" icon="pi pi-pen-to-square"/>
                <Button v-else label="evaluar" icon="pi pi-chevron-right" icon-pos="right"/>
            </section>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Image from 'primevue/image';
import { useAuthStore } from '../../stores/gestion-usuario/auth-store';
import { Software } from '../../models/software';
import { useRoute } from 'vue-router';

const authStore = useAuthStore();
const props = defineProps<Software>();
const route = useRoute();


</script>
