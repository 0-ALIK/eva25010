<template>
    <div class="flex flex-col align-bottom justify-center items-end pt-4 w-[20.5rem] h-full px-6 bg-surface-900 rounded-lg border border-surface-800">
        <h2 class="text-2xl font-bold">{{ props.titulo }}</h2>
        
        <section class="gap-2 flex items-center w-full h-full justify-between">
            <Knob v-model="value" valueTemplate="{value}%" readonly />
            <article class="flex flex-col gap-2 items-center ">
                <small class="font-semibold">{{ props.categoria }}</small>
                <i :class="icon"></i>
                <p class="text-3xl font-bold">{{ props.valor.toFixed(2) }}</p>
            </article>

        </section>  
    </div>
</template>

<script setup lang="ts">
import 'primeicons/primeicons.css'
import Knob from 'primevue/knob';
import { computed } from 'vue';

const value = computed(()=> ((props.valor*100)/5).toFixed(2))
const props = defineProps({
    titulo: String,
    categoria: String,
    valor: Number,
    icon: String
});


</script>


