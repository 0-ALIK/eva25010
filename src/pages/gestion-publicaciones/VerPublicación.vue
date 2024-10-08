<template>
    <div>
        <ConfirmDialog group="templating">
            <template #message="slotProps">
                <div class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700">
                    <i :class="slotProps.message.icon" class="!text-6xl text-primary-500"></i>
                    <p>{{ slotProps.message.message }}</p>
                    <p>Este software contiene: </p>
                    <ul>
                        <li v-for="categoria in software?.categorias" class="list-disc">
                            {{ categoria.categoria.nombre }}
                        </li>
                    </ul>
                </div>
            </template>
        </ConfirmDialog>

        <!-- Titulo -->
        <div class="flex gap-2 mb-8">
            <h2 v-if="software" class="font-bold m-0">{{ software.nombre }}</h2>
            <Skeleton v-else height="2rem"></Skeleton>
            <Chip v-if="software" :label="software.subtipoSoftware?.nombre" />
            <p v-if="software" class="self-center">{{ fecha.formatoFecha(software.createdAt.toString()) }}</p>
        </div>

        <div class="flex gap-4">
            
            <div class="p-5 rounded-md bg-surface-900 w-full flex flex-col justify-between border border-surface-800">
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
                        <Button type="button" label="Evaluar" icon="pi pi-check-square" @click="onClickEvaluar" />
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
import ConfirmDialog from 'primevue/confirmdialog';
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
import { useRoute, useRouter } from 'vue-router';
import { useConfirmStore } from '../../stores/shared/confirm-store';
import { useFecha } from '../../composables/shared/fechas';

const publicacionService = new PublicacionesService();

const confirm = useConfirmStore();

const route = useRoute();

const fecha = useFecha();

const router = useRouter();

const software = ref<Software | null>(null);

function onClickEvaluar() {
    confirm.showConfirm({
        group: 'templating',
        message: '¿Desea comenzar la evaluación de este Software?',
        header: 'Evaluar software',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancelar',
        rejectProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Comenzar',
            severity: 'success'
        },
        accept: () => {
            router.push('/evaluar/'+software.value?.id);
        },
    });
}

onMounted(async () => {
    if (!route.params.id) {
        return;
    }

    const { id } = route.params;

    software.value = await publicacionService.obtenerPublicacionById(Number(id));
});
</script>