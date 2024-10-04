<template>
    <div class="w-full">
        <h2 class="font-bold" v-if="!enEdicion">Creación de software</h2>
        <h2 class="font-bold" v-else>Edición de software: {{ softwareEnEdicion?.nombre }}</h2>

        <div>
            <Stepper value="1" class="w-full" linear>
                <StepList>
                    <Step value="1">Datos</Step>
                    <Step value="2" v-if="!enEdicion">Categorias</Step>
                    <Step value="3" v-if="!enEdicion">Preguntas</Step>
                </StepList>

                <StepPanels>
                    <StepPanel v-slot="{ activateCallback }" value="1" class="p-5 rounded-md border border-surface-800">
                        <CrearEditarDatos @siguiente="activateCallback('2')" :software="softwareEnEdicion" />
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="2" class="p-5 rounded-md border border-surface-800" v-if="!enEdicion">
                        <CrearEditarCategorias @atras="activateCallback('1')" @siguiente="activateCallback('3')" />
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="3" class="p-5 rounded-md border border-surface-800" v-if="!enEdicion">
                        <CrearEditarPreguntas @atras="activateCallback('2')" />
                    </StepPanel>
                </StepPanels>
            </Stepper>
        </div>
    </div>
</template>

<script setup lang="ts">
import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanel from 'primevue/steppanel';
import StepPanels from 'primevue/steppanels';
import Step from 'primevue/step';
import CrearEditarDatos from '../../components/gestion-publicaciones/CrearEditarDatos.vue';
import CrearEditarCategorias from '../../components/gestion-publicaciones/CrearEditarCategorias.vue';
import CrearEditarPreguntas from '../../components/gestion-publicaciones/CrearEditarPreguntas.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { PublicacionesService } from '../../services/gestion-publicaciones/publicaciones';
import { Software } from '../../models/software';

const route = useRoute();

const publicacionService = new PublicacionesService();

const enEdicion = ref(false);

const softwareEnEdicion = ref<Software | null>(null);

onMounted(async () => {
    if (route.params.id) {
        const { id } = route.params;
        softwareEnEdicion.value = await publicacionService.obtenerPublicacionPropia(Number(id));
    }

    if (softwareEnEdicion.value) {
        enEdicion.value = true;
    }
});


</script>