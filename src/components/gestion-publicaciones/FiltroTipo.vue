<template>
    <div class="flex flex-col justify-start items-start">
        <section class="flex gap-4 p-3">
            <Select v-model="propsTipo" editable :options="propsTipo.nombre" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
            <Button label="enviar"></Button>
        </section>
    </div>
</template>

<script setup lang="ts">
import Select from 'primevue/select';
import Button from 'primevue/button';
import { TipoSoftware } from '../../models/tipo_software';

const propsTipo = defineProps<TipoSoftware>();



</script>
