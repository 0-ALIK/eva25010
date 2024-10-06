<template>
    <div>
        <h2 class="font-bold">Catalogo de publicaciones</h2>

        <div>

            <div class="bg-surface-900 border border-surface-800 p-6 rounded-md">
                <h4 class="mb-2">Nombre del software</h4>
                <div class="flex items-center gap-4">
                    <InputText placeholder="Buscar software" class="w-full" />
                    <Button label="Buscar" icon="pi pi-search" class="p-button-primary" />
                </div>
            </div>


        </div>
    </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
</script>