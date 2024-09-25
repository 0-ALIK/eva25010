<template>
    <div class="flex flex-col gap-6 mt-2 w-fit overflow-hidden">
        <h1>Perfil de Usuario</h1>

        <section class="">
            <PerfilLayout></PerfilLayout>
        </section>
    </div>
</template>

<script setup lang="ts">
import PerfilLayout from '../../layouts/PerfilLayout.vue';


console.log('Estoy en el perfil');

</script>