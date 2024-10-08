<template>
    <div class="flex flex-col gap-2">
        <section class="flex justify-start">
            <form class="p-2 flex gap-4">
                <Select v-if="!loadingCategorias" v-model="selectedCategoria" :options="categorias" optionLabel="nombre" placeholder="Categoría" class="w-full md:w-56" />
                <p v-else>Cargando categorías...</p>    

            <Select v-model="selectedSubcategoria" :options="subcategorias" optionLabel="nombre" placeholder="Subcategorías" class="w-full md:w-56" :disabled="!selectedCategoria" />          
        </form>
        </section>
        <section class="flex gap-2 h-48">
            <CardPromedio :tipo="false" icon="pi pi-check p-2 bg-surface-800 rounded self-center" :valor="100" titulo="Evaluaciones Totales"/>
            <CardPromedio :tipo="true"  icon="pi pi-check p-2 bg-surface-800 rounded self-center" :valor="100" titulo="Promedio Final"/>
            <CardPromedioCategoria icon="pi pi-check p-2 bg-surface-800 rounded self-center" titulo="Promedio Categoria" :categoria="selectedCategoria?.nombre || 'NADA' " :valor="promedioFinalCategoria || 100"/>
            <CardPromedioCategoria icon="pi pi-check p-2 bg-surface-800 rounded self-center" titulo="Promedio Subcat. " :categoria="selectedSubcategoria?.nombre || 'NADA'" :valor="promedioFinalSubCategoria || 50"/>
        </section>

        <section class="flex gap-4 w-full">
            <!-- Solo renderizar si selectedSubcategoria no es null -->
            <GraficaBarras v-if="selectedSubcategoria" :subcategoria="selectedSubcategoria" :softwareId="selectedSoftwareId" /> 

        </section>
    </div>
</template>

<script setup lang="ts">
import CardPromedio from '../../components/visualizacion-resultados/CardPromedio.vue';
import CardPromedioCategoria from '../../components/visualizacion-resultados/CardPromedioCategoria.vue';
import { Categoria } from '../../models/categoria';
import { Subcategoria } from '../../models/subcategoria';
import Select from 'primevue/select';
import { ref, onMounted, watch } from 'vue';
import { ResultadosService } from '../../services/visualizacion-resultados/resultados';
import { EvaluacionesService } from '../../services/gestion-evaluaciones/evaluaciones';
import GraficaBarras from '../../components/visualizacion-resultados/GraficaBarras.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const categorias = ref<Categoria[]>([]);
const subcategorias = ref<Subcategoria[]>([]);
const selectedCategoria = ref<Categoria | null>(null);
const selectedSubcategoria = ref<Subcategoria | null>(null);
const selectedSoftwareId = ref<any>('');

const totalEvaluaciones = ref<any[]>([]); 
const promedioFinal = ref<number>(0); 
const promedioFinalCategoria = ref<number>(0);
const promedioFinalSubCategoria = ref<number>(0);

const resultadosService = new ResultadosService();
const evaluacionesService = new EvaluacionesService();

const tipo = ref();

watch(selectedCategoria, async (newCategoria) => {
    console.log('Nueva categoría seleccionada:', newCategoria);
    if (newCategoria && newCategoria.id) {
        await loadSubCategorias(newCategoria.id);
    } else {
        subcategorias.value = []; 
    }
});

async function loadPromedioFinal() {
    try {
        const response = await resultadosService.obtenerPromedioFinal('0');
        promedioFinal.value = response;
        console.log('Promedo final:  ', promedioFinal.value);
    } catch (error) {
        console.error('Error al cargar el promedio final:', error);
    }
}

async function loadTotalEvaluaciones() {
    try {
        const { id } = route.params;
        const response = await resultadosService.obtenerTotalEvaluaciones(id.toString());
        console.log('Response:', response);
        
        totalEvaluaciones.value = response;
        console.log('Total eva:  ', totalEvaluaciones.value);
    } catch (error) {
        console.error('Error al cargar las evaluaciones totales:', error);
    }
};

async function loadPromedioCategoria() {
    try {
        const response = await resultadosService.obtenerPromedioFinal(/*dos argumentos*/);
        promedioFinalCategoria.value = response;
        console.log('Promedo final:  ', promedioFinalCategoria.value);
    } catch (error) {
        console.error('Error al cargar el promedio final:', error);
    }
};

async function loadPromedioSubCategoria() {
    try {
        const response = await resultadosService.obtenerPromedioSubCategoria(/*dos argumentos*/);
        promedioFinalSubCategoria.value = response;
        console.log('Promedo final:  ', promedioFinalSubCategoria.value);
    } catch (error) {
        console.error('Error al cargar el promedio final:', error);
    }
};

async function loadSubCategorias(categoriaId: string) {
    try {
        const response = await evaluacionesService.obtenerSubCategorias(categoriaId);
        if (response) {
            subcategorias.value = response;
            console.log('Subcategorías cargadas:', subcategorias.value);
        } else {
            console.error('No se encontraron subcategorías.');
        }
    } catch (error) {
        console.error('Error al cargar las subcategorías:', error);
    }
}

const loadingCategorias = ref<boolean>(true);

async function loadCategorias() {
    loadingCategorias.value = true;
    try {
        const response = await evaluacionesService.obtenerCategorias();
        if (response && Array.isArray(response)) {
            categorias.value = response;
            console.log('Categorías cargadas:', categorias.value);
        } else {
            console.error('No se encontraron categorías.');
        }
    } catch (error) {
        console.error('Error al cargar las categorías:', error);
    } finally {
        loadingCategorias.value = false;
    }
}

onMounted(() => {
    loadCategorias();
    loadTotalEvaluaciones();
    loadPromedioFinal();
});
</script>
