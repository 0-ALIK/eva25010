<template>
    <div class="bg-surface-800 p-4 rounded-md">
        <div class="flex gap-4 items-center">
            <Usuario :usuario="props.evaluacion.usuario" />
            <p>{ props.evaluacion.comentario.createdAt }</p>
        </div>

        <div class="rounded-md ring-1 ring-offset-sky-500 p-4">
            <p>{ props.evaluacion.comentario.descripcion }</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Evaluacion } from '../../models/evaluacion';
import Usuario from '../shared/Usuario.vue';

const props = defineProps<{
    evaluacion: Evaluacion;
}>();
</script>