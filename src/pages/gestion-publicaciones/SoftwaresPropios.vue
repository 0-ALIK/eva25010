<template>
    <div>
        <ul class=" flex flex-col gap-2">
            <li v-for="publicacion in publicaciones" :key="publicacion.id" >
                <CardSoftware :software="publicacion" />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CardSoftware from '../../components/shared/CardSoftware.vue';
import { PublicacionesService } from '../../services/gestion-publicaciones/publicaciones';
import { Software } from '../../models/software';

const publicaciones = ref<Software[]>([]);

async function loadPublicaciones() {
  try {
    const publicacionesService = new PublicacionesService();
    const response = await publicacionesService.obtenerPublicacionesPropias();

    if (response) {
        publicaciones.value = response;
      console.log('Publicaciones del usuario:', publicaciones.value);
    } else {
        console.error('No se encontraron publicaciones.');
    }
  } catch (error) {
    console.error('Error al cargar las publicaciones:', error);
  }
};

onMounted(async () => {
  

  
  await loadPublicaciones(); 
  
});
</script>