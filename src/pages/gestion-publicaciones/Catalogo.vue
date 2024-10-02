<template>
    <div class="flex gap-2 w-full overflow-x-hidden">

        <section class="flex flex-col gap-4 w-full p-4">
            <h1>Todos los softwares</h1>
            <!-- Mostrar lista de publicaciones -->
            <div v-for="software in publicacionesFiltradas" :key="software.id" class="mb-4 flex flex-col gap-2">
                <CardSoftware :nombre="software.nombre" :portada="software.portada" :descripcion="software.descripcion" :licencia="software.licencia" :version="software.version" :enlace="software.enlace"/>
            </div>
        </section>

        <section class="w-full">
            <Filtros :licencias="licencias" :tipo="tipos" @aplicarFiltros="aplicarFiltros"/>
        </section>

    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Filtros from '../../components/gestion-publicaciones/Filtros.vue';
import CardSoftware from '../../components/shared/CardSoftware.vue';
import { Licencia } from '../../models/licencia';
import { TipoSoftware } from '../../models/tipo_software';
import { PublicacionesService } from '../../services/gestion-publicaciones/publicaciones';
import { Software } from '../../models/software';


const licencias = ref<Licencia[]>([]);
const tipos = ref<TipoSoftware[]>([]);
const publicacion = ref<Software[]>([]);

const filtrosActivos = ref({
  nombre: '',          // Para búsqueda por nombre
  tipo: [] as TipoSoftware[],   // Para los tipos de software seleccionados
  licencias: [] as Licencia[],  // Para las licencias seleccionadas
});

const publicacionesService = new PublicacionesService();

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
    tipos.value = await publicacionesService.obtenerTipos() || [];
    console.log('Funciona load', tipos.value, licencias.value)


  } catch (error) {
    console.error('Error al cargar los filtros:', error);
  }
};

const publicacionesFiltradas = computed(() => {
  return publicacion.value.filter((software) => {
    // Filtro por nombre
    const matchesNombre = software.nombre?.toLowerCase().includes(filtrosActivos.value.nombre.toLowerCase());

    // Filtro por tipo de software
    const matchesTipo = filtrosActivos.value.tipo.length === 0 || filtrosActivos.value.tipo.some(tipo => tipo.id === software.subtipoSoftware?.id);

    // Filtro por licencia
    const matchesLicencia = filtrosActivos.value.licencias.length === 0 || filtrosActivos.value.licencias.some(licencia => licencia.id === software.licencia?.id);
    console.log('Funciona publicFilt')
    return matchesNombre && matchesTipo && matchesLicencia;
  });
});

function aplicarFiltros(filtros: { nombre: string, tipo: TipoSoftware[], licencias: Licencia[] }) {
  filtrosActivos.value = filtros;
  console.log('Funciona aplicFilt')

};

onMounted(() => {
    loadFiltros();
    loadPublicaciones();
});


</script>