<template>
    <div>
        <h2 class="font-bold">Catalogo de publicaciones</h2>

        <div>

            <div class="bg-surface-900 border border-surface-800 p-6 rounded-md mb-4">
                <h4 class="mb-2">Nombre del software</h4>
                <div class="flex items-center gap-4">
                    <InputText v-model="search" placeholder="Buscar software" class="w-full" />
                    <Button label="Buscar" icon="pi pi-search" class="p-button-primary" @click="onClickBuscar"/>
                </div>
            </div>


            <div class="flex gap-4 items-start">

                <div class="w-full flex flex-col gap-4">
                    <div v-if="publicaciones.length === 0" v-for="i in [1,2,3]" :key="i">
                        <LoadSkeleton />
                    </div>
                    <div v-if="publicaciones.length !== 0" v-for="software in publicaciones" :key="software.id">
                        <CardSoftware :software="software" />
                    </div>
                </div>

                <div class="bg-surface-900 border border-surface-800 p-6 rounded-md w-1/3">
                    <h4 class="text-lg mb-4">Filtros</h4>

                    <div class="mb-4">
                        <Select v-model="licencia" :options="licencias" :loading="licencias.length === 0" optionLabel="nombre" placeholder="Licencia" class="w-full" />
                    </div>

                    <div class="mb-4">
                        <Select v-model="tipo" :options="tipos" :loading="tipos.length === 0" optionLabel="nombre" placeholder="Tipos de software" class="w-full" />
                    </div>

                    <div>
                        <Button label="Filtrar" icon="pi pi-filter" class="p-button-primary mr-2" @click="onClickFilter" />
                        <Button label="Limpiar" icon="pi pi-times" class="p-button-secondary" @click="onClickClear" />
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import LoadSkeleton from '../../components/shared/LoadSkeleton.vue';
import Select from 'primevue/select';
import CardSoftware from '../../components/shared/CardSoftware.vue';
import { onMounted, ref } from 'vue';
import { Licencia } from '../../models/licencia';
import { PublicacionesService } from '../../services/gestion-publicaciones/publicaciones';
import { TipoSoftware } from '../../models/tipo_software';
import { Software } from '../../models/software';
import { useToastStore } from '../../stores/shared/toast-store';

const publicacionService = new PublicacionesService();

const licencias = ref<Licencia[]>([]);

const licencia = ref<Licencia | null>(null);

const tipos = ref<TipoSoftware[]>([]);

const tipo = ref<TipoSoftware | null>(null);

const publicaciones = ref<Software[]>([]);

const search = ref<string>('');

const toast = useToastStore();

function onClickClear() {
    licencia.value = null;
    tipo.value = null;
}

async function onClickFilter() {
    const licenciaId = licencia.value?.id || undefined;
    const tipoId = tipo.value?.id || undefined;

    console.log(licenciaId, tipoId);
    

    publicaciones.value = await publicacionService.obtenerAllPublicaciones({licencia: licenciaId, tipo: tipoId});
}

async function onClickBuscar() {
    const searchTrim = search.value.trim();

    if (searchTrim.length === 0) {
        publicaciones.value = await publicacionService.obtenerAllPublicaciones();
        return;
    }

    const response = await publicacionService.obtenerAllPublicaciones({search: searchTrim});

    if(!response) {
        toast.showToast('error', 'Error', 'No se encontraron resultados');
    }

    publicaciones.value = response;
}

onMounted(async () => {

    licencias.value = await publicacionService.obtenerLicencias();

    tipos.value = await publicacionService.obtenerTipos();

    publicaciones.value = await publicacionService.obtenerAllPublicaciones();
    
});
</script>