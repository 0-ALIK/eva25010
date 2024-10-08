<template>
    <div class="flex flex-col h-screen">
        <div class="flex justify-end flex-row-reverse gap-4  h-full">
            <section class="flex flex-col gap-2 mt-2 ml-64 w-full">
                <Tabs class="w-full">
                    <h1>Perfil de Usuario</h1>

                    <TabList class="border border-surface-800 rounded-md px-1 bg-surface-900">

                        <RouterLink to="/perfil/software">
                            <Tab value="/software">Software</Tab>
                        </RouterLink>
                        <RouterLink to="/perfil/evaluaciones">
                            <Tab value="/evaluaciones">Historial de Evaluaciones</Tab>
                        </RouterLink>   
                    </TabList>
                </Tabs>
                <div v-if="route.path === '/perfil'" class="flex justify-center">
                    <img src="/Saly-12.png" alt="imagen" class="h-[40%]">
                </div>
                <div v-else>
                  <RouterView />
                </div>
            </section>

            <section class="relative">
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
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
  
