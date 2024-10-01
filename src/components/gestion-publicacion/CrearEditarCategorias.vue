<template>
    <div>
        <PickList @update:model-value="onUpdateCategorias" v-model="categorias" dataKey="id" breakpoint="1400px" scrollHeight="24rem" :showSourceControls="false" :showTargetControls="false" class="h-96">
            <template #option="{ option , selected }">
                <div class="flex flex-wrap p-1 items-center gap-4 w-full">
                    <div class="flex-1 flex flex-col">
                        <span class="font-medium text-sm">{{ option.nombre }}</span>
                        <span :class="['text-sm', { 'text-surface-500 dark:text-surface-400': !selected, 'text-inherit': selected }]">{{ option.id }}</span>
                    </div>
                    
                </div>
            </template>
        </PickList>

        <div class="flex justify-center gap-4 mt-10">
            <Button label="Atrás" severity="secondary" icon="pi pi-arrow-left" @click="onClickAtras" />
            <Button label="Siguiente" icon="pi pi-arrow-right" iconPos="right" :disabled="categoriasSeleccionadas.length === 0" @click="onClickSiguiente" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import PickList from 'primevue/picklist';
import { onMounted, ref } from 'vue';
import { usePublicacionStore } from '../../stores/gestion-publicaciones/publicacion-store';
import { EvaluacionesService } from '../../services/evaluaciones/evaluaciones';

const evaluacionesService = new EvaluacionesService();

const emit = defineEmits<{
    (e: 'atras'): void;
    (e: 'siguiente'): void;
}>();

const categorias = ref();

const categoriasSeleccionadas = ref([]);

const publicacionStore = usePublicacionStore();

function onClickAtras() {
    emit('atras');
}

function onClickSiguiente() {
    publicacionStore.setCategorias(categoriasSeleccionadas.value);
    emit('siguiente');
}

function onUpdateCategorias(event: any) {
    categoriasSeleccionadas.value = event[1].map((c:any) => ({categoria: c.id}));
    publicacionStore.setCategoriasElegidas(categoriasSeleccionadas.value);
}

onMounted(async () => {
    const categoriasCargadas = await evaluacionesService.obtenerCategorias();

    if (categorias) {
        categorias.value = [ categoriasCargadas, [] ];
    }
});
</script>