
<template>
    <div class="card w-full h-fit bg-surface-900 flex rounded-md p-3 gap-6 justify-start items-center border border-surface-800 shadow-2xl ">
        <section class="overflow-hidden rounded-lg w-9/12">
            <Skeleton width="9rem" height="6rem" borderRadius="16px"></Skeleton>
        </section>

        <article class="flex flex-col gap-2" >
            <div class="flex justify-between gap-24"><!--Nombre, fecha-->
                <Skeleton width="9rem" class="mb-2"></Skeleton>
                <Skeleton width="9rem" class="mb-2"></Skeleton>
                <Skeleton width="9rem" class="mb-2"></Skeleton>
            </div>
            <!--Descripción-->
            <Skeleton width="100%" height="66px"></Skeleton>
            <!--Botones de datos-->
            <section class="text-white flex justify-star gap-6">
                <Skeleton width="6rem" height="2rem"></Skeleton>
                <Skeleton width="6rem" height="2rem"></Skeleton>
                <Skeleton width="6rem" height="2rem"></Skeleton>
            </section>
        </article>

        <!--Botón acción-->
        <section class="w-fit">
            <Skeleton width="6rem" height="3rem"></Skeleton>
        </section>
    </div>
</template>

<script setup lang="ts">
import Skeleton from 'primevue/skeleton';

</script>

