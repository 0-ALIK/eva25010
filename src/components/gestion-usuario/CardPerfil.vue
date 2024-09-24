<template>
    <div class="h-fit pb-72 overflow-hidden p-space flex flex-col bg-surface-800 justify-start gap-6 items-center mt-14 w-fit">
        <Avatar label="P" class="mr-2" size="xlarge" shape="circle" />
        <article class="flex gap-4 bg-primary-500 p-3 rounded-md border-white border"> 
            <h4>Nombre</h4>
            <h4>Apellido</h4>
        </article>
        <h4>Profesión</h4>

        <article class="flex gap-4">
            <h4>Cargo</h4>
            <h4>Responsabilidad</h4>
        </article>

        <Button label="Editar" icon="pi pi-pen-to-square"></Button>
    </div>
</template>

<script setup lang="ts">
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';

</script>

