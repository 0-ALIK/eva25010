<template>
    <div class="flex items-center bg-surface-800 p-2 rounded-md w-fit">
        <Avatar v-if="props.usuario"  class="mr-2" size="large" shape="circle" :image="props.usuario?.foto || '/user_placeholder.jpg'" />
        <Skeleton v-else shape="circle" size="3rem" class="mr-2"></Skeleton>
        <div>
            <p v-if="props.usuario">{{ props.usuario?.nombre + ' ' + props.usuario?.apellido }}</p>
            <small v-if="props.usuario"  class="text-gray-500">{{
                props.usuario?.profesion ?
                props.usuario?.profesion :
                'No profesional'
            }}</small>
        </div>
    </div>
</template>

<script setup lang="ts">
import Avatar from 'primevue/avatar';
import Skeleton from 'primevue/skeleton';
import { Usuario } from '../../models/usuario';

const props = defineProps<{
    usuario: Usuario | null | undefined;
}>();
</script>