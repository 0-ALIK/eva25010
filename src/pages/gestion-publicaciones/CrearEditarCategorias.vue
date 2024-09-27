<template>
    <div>
        <PickList v-model="categorias" dataKey="id" breakpoint="1400px" scrollHeight="24rem" :showSourceControls="false" :showTargetControls="false" class="h-96">
            <template #option="{ option , selected }">
                <div class="flex flex-wrap p-1 items-center gap-4 w-full">
                    <img class="w-12 shrink-0 rounded" :src="'https://primefaces.org/cdn/primevue/images/product/' + option.image" :alt="option.name" />
                    <div class="flex-1 flex flex-col">
                        <span class="font-medium text-sm">{{ option.name }}</span>
                        <span :class="['text-sm', { 'text-surface-500 dark:text-surface-400': !selected, 'text-inherit': selected }]">{{ option.category }}</span>
                    </div>
                    <span class="font-bold">${{ option.price }}</span>
                </div>
            </template>
        </PickList>

        <div class="flex justify-center gap-4 mt-10">
            <Button label="Atrás" severity="secondary" icon="pi pi-arrow-left" @click="onClickAtras" />
            <Button label="Siguiente" icon="pi pi-arrow-right" iconPos="right" @click="onClickSiguiente" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import PickList from 'primevue/picklist';
import { ref } from 'vue';

const emit = defineEmits<{
    (e: 'atras'): void;
    (e: 'siguiente'): void;
}>();

const categorias = ref([[
    { id: 1, name: 'Appliance 1', category: 'Category 1', price: 100, image: 'product1.jpg' },
    { id: 2, name: 'Appliance 2', category: 'Category 1', price: 200, image: 'product2.jpg' },
    { id: 3, name: 'Appliance 3', category: 'Category 1', price: 150, image: 'product3.jpg' },
    { id: 4, name: 'Appliance 4', category: 'Category 2', price: 250, image: 'product4.jpg' },
    { id: 5, name: 'Appliance 5', category: 'Category 2', price: 350, image: 'product5.jpg' }
], []]);

function onClickAtras() {
    emit('atras');
}

function onClickSiguiente() {
    emit('siguiente');
}
</script>