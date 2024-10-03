<template>
    <div>
        <section class="flex flex-col justify-start">
            <form class="p-2 flex flex-col gap-4">
                <Select v-model="props.categoria" editable :options="props.categoria" optionLabel="name" placeholder="Categoria" class="w-full md:w-56 bg-white" />
            </form>
        </section>
        <section class="flex gap-2">
            <CardPromedio :valor="100" titulo="Evaluaciones Totales Recibidad"/>
            <CardPromedio :valor="100" titulo="Promedio Final"/>
            <CardPromedioCategoria categoria="Categoria x" :valor="100"/>
            <CardPromedioSub/>

        </section>
    </div>
</template>

<script setup lang="ts">
import CardPromedio from '../../components/visualizacion-resultados/CardPromedio.vue';
import CardPromedioCategoria from '../../components/visualizacion-resultados/CardPromedioCategoria.vue';
import CardPromedioSub from '../../components/visualizacion-resultados/CardPromedioSub.vue';
import { Categoria } from '../../models/categoria';
import Select from 'primevue/select';
import { Subcategoria } from '../../models/subcategoria';
import { onMounted, ref } from 'vue';
import { EvaluacionesService } from '../../services/gestion-evaluaciones/evaluaciones';

// Props
const props = defineProps<{
  categoria: Categoria[]; 
}>();

const subcategorias = ref<Subcategoria[]>([]);

async function loadSubCategorias() {
  try {
    const subcategoriasService = new EvaluacionesService();
    const response = await subcategoriasService.obtenerSubCategorias();

    if (response) {
        subcategorias.value = response;
      console.log('Evaluaciones del usuario:', subcategorias.value);
    } else {
        console.error('No se encontraron Evaluaciones.');
    }
  } catch (error) {
    console.error('Error al cargar las evaluaciones:', error);
  }
};

onMounted(()=> {
    loadSubCategorias();
})

</script>

<style scoped>

</style>