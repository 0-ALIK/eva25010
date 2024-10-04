<template>
    <div>
        <ul>
            <li v-for="evaluacion in evaluaciones" :key="evaluacion.id" >
                <CardEvaluacionesPropias
                :id="evaluacion.id"
                :portada="evaluacion?.software?.portada"
                :nombre="evaluacion?.software?.nombre"
                :nombreUsuario="evaluacion?.software?.usuario?.nombre"
                :ApellidoUsuario="evaluacion?.software?.usuario?.apellido"
                :fecha="evaluacion?.createdAt"
                :descripcion="evaluacion?.comentario?.descripcion"
                :respuestas="evaluacion?.respuestas"
                />
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
  try {
    const evaluacionesService = new EvaluacionesService();
    const response = await evaluacionesService.obtenerEvaluacionesPropias();

    if (response) {
        evaluaciones.value = response;
      console.log('Evaluaciones del usuario:', evaluaciones.value);
    } else {
        console.error('No se encontraron Evaluaciones.');
    }
  } catch (error) {
    console.error('Error al cargar las evaluaciones:', error);
  }
};

onMounted(()=> {
    loadEvaluacionesPropias();
})
</script>
