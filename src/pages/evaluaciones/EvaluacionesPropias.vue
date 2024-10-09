<template>
    <div class="p-4 bg-surface-900 rounded-md border border-surface-800">
        <DataTable v-if="evaluaciones.length !== 0" v-model:selection="evaluacion" :value="evaluaciones" selectionMode="single" dataKey="id" :metaKeySelection="false" @rowSelect="onRowSelect" tableStyle="min-width: 50rem">
            <Column header="Fecha">
                <template #body="slotProps">
                    {{ fecha.formatoFecha(slotProps.data.createdAt) }}
                </template>
            </Column>
            <Column field="software.nombre" header="Software"></Column>
            <Column header="Comentario">
                <template #body="slotProps">
                    <template v-if="slotProps.data.comentario">
                        {{ slotProps.data.comentario }}
                    </template>
                    <template v-else>
                        <span class="text-gray-400">Sin comentario</span>
                    </template>
                </template>
            </Column>
        </DataTable>

        <div v-else>
            <Message>No tienes evaluaciones realizadas.</Message>
        </div>  
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import DataTable from 'primevue/datatable';
import Message from 'primevue/message';
import Column from 'primevue/column';
import { Evaluacion } from '../../models/evaluacion';
import { EvaluacionesService } from '../../services/gestion-evaluaciones/evaluaciones';
import { useFecha } from '../../composables/shared/fechas';

const evaluaciones = ref<Evaluacion[]>([]);

const evaluacion = ref<Evaluacion | null>(null);

const fecha = useFecha();

async function loadEvaluacionesPropias() {
    const evaluacionesService = new EvaluacionesService();
    const response = await evaluacionesService.obtenerEvaluacionesPropias();
    if (response) {
        evaluaciones.value = response;
    }
}

function onRowSelect(event: any) {
    console.log('Row selected:', event.data);
}

onMounted(async ()=> {
    await loadEvaluacionesPropias();
})
</script>
