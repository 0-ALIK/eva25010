<template>
    <div class="flex flex-col justify-start items-end">
        <form action="" class="p-2 flex flex-col gap-4">
            <!-- Tipos de Licencia -->
            <div class="card flex justify-center flex-col">
                <h4>Tipos de licencia</h4>
                <Listbox v-model="props" checkmark  multiple :options="props" optionLabel="nombre" filter listStyle="height:110px" class="w-full md:w-56 " />
            </div>
            <Button label="Enviar"></Button>
        </form>
    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Listbox from 'primevue/listbox';
import { Licencia } from '../../models/licencia';

// Props
const props = defineProps<Licencia>();

</script>
