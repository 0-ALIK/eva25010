<template>
    <div>
        <ul>
            <li v-for="evaluacion in evaluaciones" :key="evaluacion.id" >
                <CardEvaluacionesPropias :evaluacion="evaluacion" />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CardEvaluacionesPropias from '../../components/gestion-usuario/CardEvaluacionesPropias.vue';
import { Evaluacion } from '../../models/evaluacion';
import { EvaluacionesService } from '../../services/gestion-evaluaciones/evaluaciones';

const evaluaciones = ref<Evaluacion[]>([]);

async function loadEvaluacionesPropias() {
    const evaluacionesService = new EvaluacionesService();
    const response = await evaluacionesService.obtenerEvaluacionesPropias();

    if (response) {
        evaluaciones.value = response;
    }
}

onMounted(async ()=> {
    await loadEvaluacionesPropias();
})
</script>
