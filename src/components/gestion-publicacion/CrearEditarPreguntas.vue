<template>
    <div class="flex">
        <div class="w-full">
            <BlockUI :blocked="true" class="p">
                <Panel header="Agregar o editar pregunta">
                    
                </Panel>
            </BlockUI>
        </div>


        <div class="w-full">
            <Accordion :value="0">
                <AccordionPanel v-for="(categoria, index) in categorias" :value="index" :key="categoria.nombre">
                    <AccordionHeader>{{ categoria.nombre }}</AccordionHeader>
                    <AccordionContent>
                        <div v-if="categoria.pregunta" class="flex gap-2 items-center justify-between">
                            <div class="p-2 rounded-md w-fit bg-surface-800">
                                <span>{{ categoria.pregunta }}</span>
                            </div>
                            <Button icon="pi pi-pencil" />
                        </div>
                        <div v-else class="flex gap-2 items-center">
                            <Message severity="info" class="w-full">No tiene preguntas</Message>
                            <Button icon="pi pi-plus" />
                        </div>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePublicacionStore } from '../../stores/gestion-publicaciones/publicacion-store';
import BlockUI from 'primevue/blockui';
import Panel from 'primevue/panel';
import Message from 'primevue/message';
import Button from 'primevue/button';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import { ref } from 'vue';

const publicacionStore = usePublicacionStore();

const formMeta = ref({
    blocked: true,
    header: 'Agregar o editar pregunta',
    currentCategoria: null,
    buttonLabel: 'Agregar pregunta',
});

const categorias = ref<any>(publicacionStore.getCategoriasElegidas());

function a() {
    categorias.value[0].pregunta = '¿Cuál es tu color favorito?';
}
</script>