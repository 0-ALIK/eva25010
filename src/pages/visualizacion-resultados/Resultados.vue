<template>
    <div class="flex flex-col gap-2">
        <section class="flex justify-start">
            <form class="p-2 flex gap-4">
                <Select v-model="selectedCategoria" :options="categorias" optionLabel="nombre" placeholder="Categoría" class="w-full md:w-56" />
                <Select v-model="selectedSubcategoria" :options="subcategorias" optionLabel="nombre" @change="onSelectedSubcategoria" placeholder="Subcategorías" class="w-full md:w-56" :disabled="!selectedCategoria" />          
        </form>
        </section>
        <section class="flex gap-2 h-52">
            <CardPromedio :tipo="false" icon="pi pi-check p-2 bg-surface-800 rounded self-center" :valor="totalEvaluaciones.length" titulo="Evaluaciones Totales"/>
            <CardPromedio :tipo="true"  icon="pi pi-check p-2 bg-surface-800 rounded self-center" :valor="promedioFinal?.promedio" titulo="Promedio Final"/>
            <CardPromedioCategoria icon="pi pi-check p-2 bg-surface-800 rounded self-center" titulo="Promedio Categoria" :categoria="selectedCategoria?.nombre || 'NADA' " :valor="promedioFinalCategoria?.promedio || 0 "/>
            <CardPromedioCategoria icon="pi pi-check p-2 bg-surface-800 rounded self-center" titulo="Promedio Subcat. " :categoria="selectedSubcategoria?.nombre || 'NADA'" :valor="promedioFinalSubCategoria?.promedio || 0"/>
        </section>

        <section class="flex gap-4 w-full">
            <!-- Solo renderizar si selectedSubcategoria no es null -->
            <GraficaBarras v-if="selectedSubcategoria" :subcategoria="selectedSubcategoria" :softwareId="software.id" /> 

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
import { Software } from '../../models/software';
import { PublicacionesService } from '../../services/gestion-publicaciones/publicaciones';

const route = useRoute();
const software = ref<Software | null>(null) 
const categorias = ref<Categoria[]>([]);
const subcategorias = ref<Subcategoria[]>([]);
const selectedCategoria = ref<Categoria | null>(null);
const selectedSubcategoria = ref<Subcategoria | null>(null);

const totalEvaluaciones = ref<any[]>([]); 
const promedioFinal = ref<any>(); 
const promedioFinalCategoria = ref<any>();
const promedioFinalSubCategoria = ref<any>();

const resultadosService = new ResultadosService();
const evaluacionesService = new EvaluacionesService();

watch(selectedCategoria, async (newCategoria) => {
    console.log('Nueva categoría seleccionada:', newCategoria);
    if (newCategoria && newCategoria.id) {
        await loadSubCategorias(newCategoria.id);
        await loadPromedioCategoria();
    } else {
        subcategorias.value = []; 
    }
});

async function onSelectedSubcategoria(event: any){
    console.log(event);
    await loadPromedioSubCategoria();
}

async function loadPromedioFinal() {
    try {
        const { id } = route.params;
        const response = await resultadosService.obtenerPromedioFinal(Number(id));
        promedioFinal.value = response;
        console.log('Promedo final:  ', promedioFinal.value);
    } catch (error) {
        console.error('Error al cargar el promedio final:', error);
    }
}

async function loadTotalEvaluaciones() {
    try {
        const { id } = route.params;
        const response = await resultadosService.obtenerTotalEvaluaciones(Number(id));
        console.log('Response:', response);
        
        totalEvaluaciones.value = response;
        console.log('Total eva:  ', totalEvaluaciones.value);
    } catch (error) {
        console.error('Error al cargar las evaluaciones totales:', error);
    }
};

async function loadPromedioCategoria() {
    try {
        const { id } = route.params;
        const response = await resultadosService.obtenerPromedioCategoria(Number(id), selectedCategoria.value.id);
        promedioFinalCategoria.value = response;
        console.log('Promedo final cate:  ', promedioFinalCategoria.value);
    } catch (error) {
        console.error('Error al cargar el promedio final:', error);
    }
};

async function loadPromedioSubCategoria() {
    try {
        const { id } = route.params;
        const response = await resultadosService.obtenerPromedioSubCategoria(Number(id), selectedSubcategoria.value.id );
        promedioFinalSubCategoria.value = response;
        console.log('Promedo final:  ', promedioFinalSubCategoria.value);
    } catch (error) {
        console.error('Error al cargar el promedio final subcategoria:', error);
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

async function loadCategorias() {
    categorias.value = software.value.categorias.map(categoria => categoria.categoria )
};


async function loadPublicaciones() {
  try {
    const { id } = route.params;
    const publicacionesService = new PublicacionesService();
    const response = await publicacionesService.obtenerPublicacionPropia(Number(id));

    if (response) {
        software.value = response;
        console.log('Publicaciones: ', software.value);
    } else {
        console.error('No se encontraron publicaciones.');
    }
  } catch (error) {
    console.error('Error al cargar las publicaciones:', error);
  }
};



onMounted(async() => {
    await loadPublicaciones();
    await loadCategorias();
    await loadTotalEvaluaciones();
    await loadPromedioFinal();
    await loadPromedioCategoria();
    await loadPromedioSubCategoria();
    
});
</script>
