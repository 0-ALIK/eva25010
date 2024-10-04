<template>
    <div class="card w-full md:w-1/2 bg-surface-900 p-space rounded-lg border border-surface-800">
        <h2>Por Pregunta</h2>
        <Select v-model="selectedPregunta" :options="preguntas" optionLabel="descripcion"  placeholder="Seleccionar Pregunta" class="w-full md:w-56" />
        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]"  />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { ResultadosService } from '../../services/visualizacion-resultados/resultados';
import Chart from 'primevue/chart';
import Select from 'primevue/select';
import { Pregunta } from '../../models/pregunta';
import { EvaluacionesService } from "../../services/gestion-evaluaciones/evaluaciones";
import { Subcategoria } from "../../models/subcategoria";

const props = defineProps({
    subcategoria: {
        type: Object as () => Subcategoria,
        required: true,
        default: () => ({})
    },
    softwareId: {
        type: String,
        required: true,
    },
});

const preguntas = ref<Pregunta[]>([]); 
const selectedPregunta = ref<Pregunta | null>(null);
const respuestas = ref<any[]>([]);

const resultadosService = new ResultadosService();
const evaluacionesService = new EvaluacionesService();

watch(selectedPregunta, async (newPregunta) => {
    if (newPregunta) {
        await loadRespuestas(/* softwareId */, newPregunta.id);
        chartData.value = setChartData(); 
    }
});

const chartData = ref<any>(null); 
const chartOptions = ref<any>(null);

async function loadPreguntas(subcategoriaId: string) {

    try {
        const response = await evaluacionesService.obtenerPreguntasPorSubcategoria(subcategoriaId);
        console.log('Response:', response);

        preguntas.value = response;
        console.log('Preguntas cargadas:', preguntas.value);
    } catch (error) {
        console.error('Error al cargar preguntas:', error);
    }
}

async function loadRespuestas(preguntaId: number) {
    try {
        const response = await resultadosService.obtenerRespuestasPreguntas(props.softwareId, preguntaId);
        respuestas.value = response;
        console.log('Respuestas cargadas:', respuestas.value);
        chartData.value = setChartData();
    } catch (error) {
        console.error('Error al cargar las respuestas a preguntas:', error);
    }
}


const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['Totalmente en desacuerdo', 'En desacuerdo', 'Neutral', 'De acuerdo', 'Totalmente de acuerdo'],        datasets: [
            {
                label: selectedPregunta.value,
                backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
                borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                data: respuestas.value
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}


onMounted(async () => {
    if (props.subcategoria && props.subcategoria.id) {
        await loadPreguntas(props.subcategoria.id); // Cargar preguntas
    };
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});
</script>