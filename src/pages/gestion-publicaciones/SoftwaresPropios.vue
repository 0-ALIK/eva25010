<template>
    <div>
        <ul class=" flex flex-col gap-2" v-if="publicaciones.length !== 0">
            <li v-for="publicacion in publicaciones" :key="publicacion.id" >
                <CardSoftware :software="publicacion" :usuario-visible="false" />
            </li>
        </ul>
        <div v-else>
            <Message>No tienes software publicado.</Message>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CardSoftware from '../../components/shared/CardSoftware.vue';
import Message from 'primevue/message';
import { PublicacionesService } from '../../services/gestion-publicaciones/publicaciones';
import { Software } from '../../models/software';

const publicaciones = ref<Software[]>([]);

async function loadPublicaciones() {
    const publicacionesService = new PublicacionesService();
    const response = await publicacionesService.obtenerPublicacionesPropias();

    if (response) {
        publicaciones.value = response;
    }
}

onMounted(async () => {
    await loadPublicaciones(); 
});
</script>