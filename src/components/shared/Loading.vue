<template>
    <div class="fixed bg-black/55 w-screen h-screen z-[1000] left-0 top-0 items-center justify-center" :class="{ 'hidden': !props.visible, 'flex': props.visible }">
        <div>
            <ProgressSpinner />
            <h1>Cargando...</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';

const props = defineProps<{
    visible: boolean;
}>();
</script>