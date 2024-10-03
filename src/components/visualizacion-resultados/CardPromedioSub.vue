<template>
    <div class="flex flex-col items-end justify-between pt-4 w-80 px-6 bg-surface-900 rounded-lg border border-surface-800">
        <h2 class="text-2xl font-bold">Evaluaciones Totales Recibidas</h2>
        <form class="p-1">
            <Select v-model="props.subCategoria" editable :options="props.subCategoria" optionLabel="name" placeholder="Subcategorias" class="w-full md:w-56 bg-white" />
        </form>
        <h2 class="text-3xl font-bold">100</h2>
    </div>
</template>

<script setup lang="ts">
import Select from 'primevue/select';

import { Subcategoria } from '../../models/subcategoria';

const props = defineProps<{
  subCategoria: Subcategoria[];  
}>();
</script>
