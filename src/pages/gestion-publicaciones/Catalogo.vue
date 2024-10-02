<template>
    <div class="flex gap-2 w-full overflow-x-hidden">

        <section class="flex flex-col gap-4">
            <h1>Todos los softwares</h1>
            
            <!-- Mostrar lista de publicaciones -->
            <div v-for="software in publicacion" :key="software.id" class="mb-4 flex flex-col gap-2">
                <CardSoftware :nombre="software.nombre" :portada="software.portada" :descripcion="software.descripcion" :licencia="software.licencia" :version="software.version" :enlace="software.enlace"/>
            </div>
        </section>
        
        <section class="w-full">
            <Filtros/>
        </section>

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Filtros from '../../components/gestion-publicaciones/Filtros.vue';
import CardSoftware from '../../components/shared/CardSoftware.vue';
import { Licencia } from '../../models/licencia';
import { TipoSoftware } from '../../models/tipo_software';
import { PublicacionesService } from '../../services/gestion-publicaciones/publicaciones';
import { Software } from '../../models/software';


const licencias = ref<Licencia[]>([]);
const tipos = ref<TipoSoftware[]>([]);
const publicacion = ref<Software[]>([]);

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

  } catch (error) {
    console.error('Error al cargar los filtros:', error);
  }
}

onMounted(() => {

    loadFiltros();
    loadPublicaciones();
});


</script>