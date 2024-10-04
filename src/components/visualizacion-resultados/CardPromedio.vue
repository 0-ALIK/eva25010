<template>
    <div class="flex flex-col align-bottom justify-between items-end pt-4 w-80  px-6 bg-surface-900 rounded-lg border border-surface-800">
        <h2 class="text-2xl font-bold">{{ props.titulo }}</h2>
        <h2 class="text-3xl font-bold">{{ props.valor }}</h2>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    titulo: String,
    valor: Number
})

</script>
