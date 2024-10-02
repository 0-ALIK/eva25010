<template>
    <div class="flex flex-col h-screen">
        <div class="flex justify-end flex-row-reverse gap-4  h-full">
            <section class="flex flex-col gap-2 mt-2 ">
                <Tabs  value="/software" class="w-fit">
                    <h1>Perfil de Usuario</h1>

                    <TabList class="border border-surface-800 rounded-md px-1 bg-surface-900" >
                        <Tab value="/software"  @click="navigateTo('software')">Softwares</Tab>
                        <Tab value="/evaluaciones" @click="navigateTo('evaluaciones')">Historial de Evaluaciones</Tab>
                    </TabList>
                </Tabs>
                <div v-if="loading">
                  <LoadSkeleton/>
                </div>
                <!--Cargarlos en bucle-->
                <div v-else>
                  <RouterView />
                </div>
            </section>

            <section class="">
                <CardPerfil></CardPerfil>
            </section>
        </div>
    </div>
  </template>

<script setup lang="ts">
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import CardPerfil from '../components/gestion-usuario/CardPerfil.vue';
import LoadSkeleton from '../components/shared/LoadSkeleton.vue';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import { PublicacionesService } from '../services/gestion-publicaciones/publicaciones';
import { Software } from '../models/software';
import { Evaluacion } from '../models/evaluacion';
import { EvaluacionesService } from '../services/gestion-evaluaciones/evaluaciones';
import { useToastStore } from '../stores/shared/toast-store';

const router = useRouter();
const route = useRoute(); // Obtener la ruta actual
const publicacion = ref<Software[]>([]);
const evaluacion = ref<Evaluacion[]>([]);
const toastStore = useToastStore();
const loading = ref(true);

async function loadPublicaciones() {
  try {
    const publicacionesService = new PublicacionesService();
    const response = await publicacionesService.obtenerPublicacionesByUsuario();

    if (response) {
      publicacion.value = response;
      console.log('Publicaciones del usuario:', publicacion.value);
    } else {
        toastStore.showToast('error', 'Vacío', 'No tiene Publicaciones actualmente.');
        console.error('No se encontraron publicaciones para el usuario.');
    }
  } catch (error) {
    toastStore.showToast('error', 'Error', 'Error al cargar las publicaciones:');
    console.error('Error al cargar las publicaciones:', error);
  }
}

async function loadEvaluaciones(){
  try {
    const evaluacionesService = await new EvaluacionesService
    const response = await evaluacionesService.obtenerEvaluacionByUser();
    
    if (response) {
      evaluacion.value = response;
      console.log('Publicaciones del usuario:', evaluacion.value);
    } else {
        toastStore.showToast('error', 'Vacío', 'No ha evaluado nada actualmente.');
      console.error('No se encontraron evaluaciones para el usuario.');
    }
  } catch (error) {    
    toastStore.showToast('error', 'Error', 'Error al cargar las Evaluaciones:');
    console.error('Error al cargar las evaluaciones:', error);
  }
};

function navigateTo(route: string) {
  router.push(`/perfil/${route}`);
}

watch(() => route.path, async (newPath) => {
  loading.value = true; // Activar el loading
  if (newPath.includes('software')) {
    await loadPublicaciones();
  } else if (newPath.includes('evaluaciones')) {
    await loadEvaluaciones();
  }
  loading.value = false; 
});

onMounted(() => {
    setTimeout( async() => {
        console.log("Delayed for 1 second.");
       await loadPublicaciones();
       await loadEvaluaciones();
        loading.value = false;
    }, 10);
});

</script>
  
