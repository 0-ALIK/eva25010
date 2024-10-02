<template>
    <div class="flex justify-end w-full p-4">
        <form @submit.prevent="enviarFiltros" class="p-2 flex justify-end flex-col gap-4">
            <section class="flex gap-4 p-3 w-fit">
                <InputGroup >
                    <InputGroupAddon >
                        <i class="pi pi-search"></i>
                    </InputGroupAddon>
                    <InputText v-model="filtros.nombre" placeholder="Nombre del Software" />
                </InputGroup>

                <Select v-model="filtros.tipo" :options="props.tipo" optionLabel="name" placeholder="Tipos de software" class="w-full md:w-56" multiple />
                <Button label="Search" unstyled="true"  iconPos="right" size="large" class="p-2 bg-primary-400 text-white font-medium w-1/3 rounded-md" />
            </section>

            <!-- Tipos de Licencia -->
            <div class="card flex flex-col items-end">
                <h4>Tipos de licencia</h4>
                <Listbox v-model="filtros.licencias" checkmark multiple :options="props.licencias" optionLabel="nombre" filter listStyle="height:110px" class="w-full md:w-56 " />
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Listbox from 'primevue/listbox';
import Select from 'primevue/select';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import { Licencia } from '../../models/licencia';
import { TipoSoftware } from '../../models/tipo_software';
import { ref } from 'vue';
// Props
const props = defineProps<{
  licencias: Licencia[];
  tipo: TipoSoftware[];
}>();

const filtros = ref({
  nombre: '',
  tipo: [] as TipoSoftware[],
  licencias: [] as Licencia[],
});

const emit = defineEmits(['aplicarFiltros']);

function enviarFiltros() {
    console.log('Funciona comp hijo')

  emit('aplicarFiltros', filtros.value);
}


</script>
