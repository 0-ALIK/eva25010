<template>
    <div class="flex flex-col h-screen">
        <div class="flex justify-end flex-row-reverse gap-4  h-full">
            <section class="flex flex-col gap-2 mt-2 ">
                <Tabs  value="/resultados" class="w-fit">
                    <h1>Resultados</h1>
  
                    <TabList class="border border-surface-800 rounded-md px-1 bg-surface-900" >
                        <Tab value="/resultados"  @click="navigateTo('resultados')">Resultados</Tab>
                        <Tab value="/comentarios" @click="navigateTo('comentarios')">Comentarios</Tab>
                    </TabList>
                </Tabs>
                <div v-if="loading">
                    <RouterView />
                </div>
                <!--Cargarlos en bucle-->
                <div v-else>
                    <LoadSkeleton/>
                </div>
            </section>
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import Tabs from 'primevue/tabs';
  import TabList from 'primevue/tablist';
  import Tab from 'primevue/tab';
  import LoadSkeleton from '../components/shared/LoadSkeleton.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { onMounted, ref, watch } from 'vue';
  
  const router = useRouter();
  const route = useRoute(); // Obtener la ruta actual
  const loading = ref(true);
  
  
  function navigateTo(route: string) {
  router.push(`/resultados/${route}`);
  }
  
  watch(() => route.path, async (newPath) => {
  loading.value = true;
  if (newPath.includes('resultados')) {
    
  } else if (newPath.includes('comentarios')) {
  }
  loading.value = false; 
  });
  
  onMounted(() => {
    
  });
  
  </script>
  
  