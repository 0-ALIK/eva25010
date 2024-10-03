<template>
    <div>
        <!-- Titulo -->
        <div class="flex gap-2 mb-8">
            <h2 v-if="software" class="font-bold m-0">{{ software.nombre }}</h2>
            <Skeleton v-else height="2rem"></Skeleton>
            <Chip v-if="software" :label="software.subtipoSoftware?.nombre" />
            <p v-if="software"  class="self-center">{{ software.createdAt }}</p>
        </div>

        <div class="flex gap-4">
            
            <div class="p-5 rounded-md bg-surface-900 w-full flex flex-col justify-between">
                <section>
                    <p v-if="software">{{ software.descripcion }}</p>
                    <div v-else>
                        <Skeleton class="mb-2"></Skeleton>
                        <Skeleton class="mb-2"></Skeleton>
                        <Skeleton class="mb-2"></Skeleton>
                    </div>
                </section>

                <section class="flex justify-between items-center">
                    <div class="flex items-center gap-4">
                        <Usuario :usuario="software?.usuario" />

                        <div>
                            <Tag icon="pi pi-bookmark" :value="software?.version" class="mr-1"></Tag>
                            <Tag icon="pi pi-id-card" severity="secondary" :value="software?.licencia?.nombre" class="mr-1"></Tag>
                            <Button label="Obtener" icon="pi pi-download" size="small" severity="secondary" />
                        </div>
                    </div>

                    <div>
                        <Button type="button" label="Evaluar" icon="pi pi-check-square" />
                    </div>
                </section>
            </div>

            <div class="w-3/5">
                <Image :src="software?.portada" alt="Image" width="500" preview />
            </div>
        </div>

        <Divider align="center" type="dotted" class="text-primary">
            <b>Comentarios más recientes</b>
        </Divider>

        <div>
            <!-- <Comentario v-if="software?.evaluaciones" :evaluacion="software?.evaluaciones[0]" /> -->
        </div>

    </div>
</template>

<script setup lang="ts">
import Chip from 'primevue/chip';
import Image from 'primevue/image';
import Tag from 'primevue/tag';
/* import Comentario from '../../components/gestion-publicaciones/Comentario.vue'; */
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Skeleton from 'primevue/skeleton';
import Usuario from '../../components/shared/Usuario.vue';
import { onMounted, ref } from 'vue';
import { PublicacionesService } from '../../services/gestion-publicaciones/publicaciones';
import { Software } from '../../models/software';
import { useRoute } from 'vue-router';

const publicacionService = new PublicacionesService();

const route = useRoute();

const software = ref<Software | null>(null);

onMounted(async () => {
    if (!route.params.id) {
        return;
    }

    const { id } = route.params;

    software.value = await publicacionService.obtenerPublicacionById(Number(id));
});
</script>