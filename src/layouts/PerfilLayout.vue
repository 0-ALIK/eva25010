<template>
    <div class=" flex flex-col overflow-hidden">

        <div class="flex justify-end flex-row-reverse gap-4 w-full overflow-x-hidden">
            <section class="flex flex-col gap-2 w-full h-fit ">
                <Tabs  value="/software">
                    <h1>Perfil de Usuario</h1>

                    <TabList class="border border-surface-800 rounded-md px-1 bg-surface-900" >
                        <Tab value="/software"  @click="navigateTo('software')">Softwares</Tab>
                        <Tab value="/evaluaciones" @click="navigateTo('evaluaciones')">Historial de Evaluaciones</Tab>
                    </TabList>
                </Tabs>
                
            <RouterView v-if="currentRoute === route && publicacion.length > 0" 
                :portada="publicacion[0].portada" 
                :nombre="publicacion[0].nombre" 
                :descripcion="publicacion[0].descripcion" 
                :version="publicacion[0].version" 
                :nombreTipo="publicacion[0].subtipoSoftware" 
                :createdAt="publicacion[0].createdAt" 
                :enlace="publicacion[0].enlace" 
                :nombreLicencia="publicacion[0].licencia" />
                <RouterView v-else></RouterView>
            </section>

            <section class="bg-surface-900 rounded-lg border border-surface-800">
                <Perfil></Perfil>
                
            </section>
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { PublicacionesService } from '../services/gestion-publicaciones/publicaciones';
import { onMounted, ref } from 'vue';
import { Software } from '../models/software';
import Perfil from '../components/gestion-usuario/CardPerfil.vue';


const route = useRoute();
const currentRoute = route;
const router = useRouter();

const publicacion = ref<Software[]>([]); // Cambiar a un arreglo de Publicacion

  function navigateTo(route: string) {
    router.push(`/perfil/${route}`);
  }

  async function loadPublicaciones() {
    try {
        const response = await new PublicacionesService().getAllPublicaciones();
        if (response) {
            publicacion.value = response; // Asignar directamente a publicacion.value
            console.log('Publicaciones:', publicacion.value);

        } else {
            console.error('El objeto de respuesta no contiene una propiedad válida de publicaciones:', response);
        }
    } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
    }
}

onMounted(() => {
  loadPublicaciones();
});
</script>
  
