<template>
    <div class="flex gap-2">
        <section class="flex flex-col gap-4">
            <h1>Todos los softwares</h1>

            <!-- <FiltroTipo/> -->

            <!-- Mostrar lista de publicaciones -->
            <div v-for="software in publicacion" :key="software.id" class="mb-4">
                <CardSoftware :nombre="software.nombre" :portada="software.portada" :descripcion="software.descripcion" :licencia="software.licencia" :version="software.version" :enlace="software.enlace"/>
            </div>
            </section>

        <section>
            <!-- <Filtros/> -->
        </section>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Filtros from '../../components/gestion-publicaciones/Filtros.vue';
import FiltroTipo from '../../components/gestion-publicaciones/FiltroTipo.vue';
import CardSoftware from '../../components/shared/CardSoftware.vue';
import { Licencia } from '../../models/licencia';
import { Categoria } from '../../models/categoria';
import { TipoSoftware } from '../../models/tipo_software';
import { PublicacionesService } from '../../services/gestion-publicaciones/publicaciones';
import { Tecnologia } from '../../models/tecnologia';
import { EvaluacionesService } from '../../services/gestion-evaluaciones/evaluaciones';
import { Software } from '../../models/software';


const licencias = ref<Licencia[]>([]);
const tecnologias = ref<Tecnologia[]>([]);
const tipos = ref<TipoSoftware[]>([]);
const categorias = ref<Categoria[]>([]);
const publicacion = ref<Software[]>([]);

const publicacionesService = new PublicacionesService();
const evaluacionesService = new EvaluacionesService();

async function loadPublicaciones() {
  try {
    const response = await publicacionesService.obtenerAllPublicaciones();

    if (response) {
      publicacion.value = response;
      console.log('Publicaciones del usuario:', publicacion.value);
    } else {
        console.error('No se encontraron publicaciones para el usuario.');
    }
  } catch (error) {
    console.error('Error al cargar las publicaciones:', error);
  }
}

async function loadFiltros() {
  try {
    licencias.value = await publicacionesService.obtenerLicencias() || [];
    tecnologias.value = await publicacionesService.obtenerTecnologias() || [];
    categorias.value = await evaluacionesService.obtenerCategorias() || [];
    tipos.value = await publicacionesService.obtenerTipos() || [];

  } catch (error) {
    console.error('Error al cargar los filtros:', error);
  }
}

onMounted(() => {

    loadFiltros();
    loadPublicaciones();
});


</script>