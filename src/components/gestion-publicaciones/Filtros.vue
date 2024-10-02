<template>
    <div class="flex flex-col justify-start items-end">
        <form action="" class="p-2 flex flex-col gap-4">
            <section class="flex gap-4 p-3">
                <Select v-model="props.tipo" editable :options="props.tipo" optionLabel="name" placeholder="Tipos de software" class="w-full md:w-56" />
                <Button label="enviar"></Button>
            </section>
            <!-- Tipos de Licencia -->
            <div class="card flex justify-center flex-col">
                <h4>Tipos de licencia</h4>
                <Listbox v-model="props.licencias" checkmark  multiple :options="props.licencias" optionLabel="nombre" filter listStyle="height:110px" class="w-full md:w-56 " />
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Listbox from 'primevue/listbox';
import Select from 'primevue/select';
import { Licencia } from '../../models/licencia';
import { TipoSoftware } from '../../models/tipo_software';
// Props
const props = defineProps<{
  licencias: Licencia[];
  tipo: TipoSoftware[];  // Aquí defines el array correctamente
}>();

</script>
