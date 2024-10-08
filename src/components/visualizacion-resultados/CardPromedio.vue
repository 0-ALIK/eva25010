<template>
    <div class="flex flex-col justify-between items-center pt-4 w-[20.5rem] h-full px-6 bg-surface-900 rounded-lg border border-surface-800 relative">
        
        <h2 class="text-2xl font-bold">{{ props.titulo }}</h2>
        
        
        <section class="gap-2 flex items-end w-full h-full justify-between ">
            <div v-if="props.tipo === true">
                <Knob v-model="value" valueTemplate="{value}%" readonly />

            </div>
            <article class="flex flex-col self-end items-center pb-2 gap-2  ">
                <i :class="icon"></i>
                <p class="text-3xl font-bold ">{{ props.valor }}</p>
            </article>

        </section>
    </div>
</template>


<script setup lang="ts">
import 'primeicons/primeicons.css'
import Knob from 'primevue/knob';

const props = defineProps({
    titulo: String,
    valor: Number,
    icon: String,
    tipo: Boolean
});

import { ref } from 'vue';

const value = ref(50);


</script>

