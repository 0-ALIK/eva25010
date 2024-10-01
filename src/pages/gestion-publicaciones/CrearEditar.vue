<template>
    <div class="w-full">
        <h2 class="font-bold">Creación de software</h2>

        <div>
            <Stepper value="1" class="w-full" linear>
                <StepList>
                    <Step value="1">Datos</Step>
                    <Step value="2">Categorias</Step>
                    <Step value="3">Preguntas</Step>
                </StepList>

                <StepPanels>
                    <StepPanel v-slot="{ activateCallback }" value="1" class="p-5 rounded-md">
                        <CrearEditarDatos @siguiente="activateCallback('2')" />
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="2" class="p-5 rounded-md">
                        <CrearEditarCategorias @atras="activateCallback('1')" @siguiente="activateCallback('3')" />
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="3" class="p-5 rounded-md">
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
import CrearEditarDatos from '../../components/gestion-publicacion/CrearEditarDatos.vue';
import CrearEditarCategorias from '../../components/gestion-publicacion/CrearEditarCategorias.vue';
import CrearEditarPreguntas from '../../components/gestion-publicacion/CrearEditarPreguntas.vue';
</script>