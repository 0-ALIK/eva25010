<template>
    <div class="flex gap-2 w-full overflow-x-hidden">
        <section class="flex flex-col gap-4 w-full">
            <h1 class="w-full">Todos los softwares</h1>
            <div v-for="software in publicacionesFiltradas" :key="software.id" class="mb-4 flex flex-col gap-2">
                <CardSoftware
                    :nombre="software.nombre"
                    :portada="software.portada"
                    :descripcion="software.descripcion"
                    :licencia="software.licencia"
                    :version="software.version"
                    :enlace="software.enlace"
                    :id="software.id"
                />
            </div>
        </section>
        
        <section class="w-full">
            <Filtros :licencias="licencias" :tipo="tipos" :subtipos="subtipos" @filtrar="filtrarPublicaciones" />
        </section>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Filtros from '../../components/gestion-publicacion/Filtros.vue';
import CardSoftware from '../../components/shared/CardSoftware.vue';
import { Licencia } from '../../models/licencia';
import { TipoSoftware } from '../../models/tipo_software';
import { SubtipoSoftware } from '../../models/subtipo_software';
import { PublicacionesService } from '../../services/gestion-publicaciones/publicaciones';
import { Software } from '../../models/software';

const licencias = ref<Licencia[]>([]);
const tipos = ref<TipoSoftware[]>([]);
const subtipos = ref<SubtipoSoftware[]>([]);
const publicacion = ref<Software[]>([]);
const publicacionesFiltradas = ref<Software[]>([]);

const publicacionesService = new PublicacionesService();

// Función para cargar todas las publicaciones
async function loadPublicaciones() {
  try {
    const response = await publicacionesService.obtenerAllPublicaciones();
    if (response) {
      publicacion.value = response;
      publicacionesFiltradas.value = publicacion.value; // Inicialmente mostrar todas
    } else {
      console.error('No se encontraron publicaciones.');
    }
  } catch (error) {
    console.error('Error al cargar las publicaciones:', error);
  }
}

async function loadFiltros() {
  try {
    licencias.value = await publicacionesService.obtenerLicencias() || [];
    tipos.value = await publicacionesService.obtenerTipos() || [];
  } catch (error) {
    console.error('Error al cargar los filtros:', error);
  }
}

function filtrarPublicaciones(filtros: { tipo: TipoSoftware | null; subtipo: SubtipoSoftware | null; licencias: Licencia[] }) {
  publicacionesFiltradas.value = publicacion.value.filter((software) => {
    const coincideTipo = !filtros.tipo || software.subtipoSoftware.nombre === filtros.tipo.nombre;
    const coincideSubtipo = !filtros.subtipo || software.subtipoSoftware.nombre === filtros.subtipo.nombre;
    const coincideLicencia = !filtros.licencias.length || filtros.licencias.some(licencia => software.licencia.nombre === licencia.nombre);
    return coincideTipo && coincideSubtipo && coincideLicencia;
  });
}

onMounted(() => {
  loadFiltros();
  loadPublicaciones();
});
</script>
