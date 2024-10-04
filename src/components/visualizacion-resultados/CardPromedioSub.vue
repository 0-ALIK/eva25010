<template>
    <div class="flex flex-col items-end justify-between pt-4 w-80 px-6 bg-surface-900 rounded-lg border border-surface-800">
        <h2 class="text-2xl font-bold">Promedio Final Subcategoria Seleccionada</h2>
        <small class="text-lg font-semibold">{{ props.subcategoria }}</small>
        <h2 class="text-3xl font-bold">{{ props.valor }}</h2>
    </div>

</template>

<script setup lang="ts">
const props = defineProps({
    subcategoria: String,
    valor: Number
})

</script>
