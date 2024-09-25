<template>
    <div class="w-full">
        <h1 class="font-bold">Creación de software</h1>

        <div>
            <Stepper value="1" class="w-full" linear>
                <StepList>
                    <Step value="1">Datos</Step>
                    <Step value="2">Categorias</Step>
                    <Step value="3">Preguntas</Step>
                </StepList>
                <StepPanels>
                    <StepPanel v-slot="{ activateCallback }" value="1" class="p-4 rounded-md">
                        <CrearEditarDatos @siguiente="activateCallback('2')"/>
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="2" class="p-4 rounded-md">
                        <CrearEditarCategorias />
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('1')" />
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('3')" />
                        
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="3" class="p-4 rounded-md">
                        
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('2')" />
                        
                    </StepPanel>
                </StepPanels>
            </Stepper>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanel from 'primevue/steppanel';
import StepPanels from 'primevue/steppanels';
import Step from 'primevue/step';
import CrearEditarDatos from './CrearEditarDatos.vue';
import CrearEditarCategorias from './CrearEditarCategorias.vue';
</script>