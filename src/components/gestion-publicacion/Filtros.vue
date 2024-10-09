<template>
    <div class="flex flex-col justify-start items-end">
        <form @submit.prevent="enviarFiltros" class="p-2 flex flex-col gap-4">
            <!-- Tipos de Software -->
            <section class="flex gap-4 p-3">
                <Select v-model="tipoSeleccionado" :options="props.tipo" optionLabel="name" placeholder="Tipos de software" class="w-full md:w-56" @change="cargarSubtipos" />
            </section>

            <!-- Subtipos de Software -->
            <section v-if="subtipos.length > 0" class="flex gap-4 p-3">
                <Select v-model="subtipoSeleccionado" :options="subtipos" optionLabel="nombre" placeholder="Subtipos de software" class="w-full md:w-56" />
            </section>

            <!-- Tipos de Licencia -->
            <div class="card flex justify-center flex-col">
                <h4>Tipos de licencia</h4>
                <Listbox v-model="licenciasSeleccionadas" checkmark multiple :options="props.licencias" optionLabel="nombre" filter listStyle="height:110px" class="w-full md:w-56 " />
            </div>
            
            <Button label="enviar" type="submit"></Button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from 'primevue/button';
import Listbox from 'primevue/listbox';
import Select from 'primevue/select';
import { TipoSoftware } from '../../models/tipo_software';
import { Licencia } from '../../models/licencia';
import { SubtipoSoftware } from '../../models/subtipo_software';
import { PublicacionesService } from '../../services/gestion-publicaciones/publicaciones';

// Props
const props = defineProps<{
  tipo: TipoSoftware[];
  licencias: Licencia[];
  subtipos: SubtipoSoftware[];
}>();

const emit = defineEmits(['filtrar']);

const tipoSeleccionado = ref<TipoSoftware | null>(null);
const subtipoSeleccionado = ref<SubtipoSoftware | null>(null);
const licenciasSeleccionadas = ref<Licencia[]>([]);
const subtipos = ref<SubtipoSoftware[]>([]);

const publicacionesService = new PublicacionesService();

async function cargarSubtipos() {
  if (tipoSeleccionado.value) {
    try {
      subtipos.value = await publicacionesService.obtenerSubtipos(tipoSeleccionado.value.id) || [];
    } catch (error) {
      console.error('Error al cargar los subtipos:', error);
    }
  } else {
    subtipos.value = [];
  }
}

function enviarFiltros() {
  emit('filtrar', { tipo: tipoSeleccionado.value, subtipo: subtipoSeleccionado.value, licencias: licenciasSeleccionadas.value });
}
</script>
