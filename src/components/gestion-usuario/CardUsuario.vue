<template>
    <div>
        <Card :unstyled="true" class="flex w-fill flex-col w-fit items-center justify-center bg-surface-900 gap-5 p-8 border border-surface-800 rounded-lg">
            <template #header>
                <Avatar :image="props.usuario.foto" unstyled="true" class="mr-2 w-24" shape="circle" />
            </template>

            <template #title  class=" text-center text-primary-400 font-medium "> {{props.usuario.nombre}} {{ props.usuario.apellido }} </template>
            <template #content>
                <p  class="m-0 text-center text-gray-500 text-xs">
                    {{ props.usuario.profesion?.nombre }}
                </p>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import Avatar from 'primevue/avatar';
import Card from 'primevue/card';
import { Usuario } from '../../models/usuario';

const props = defineProps<{
    usuario: Usuario;
}>();

</script>
