<template>
    <div>
        <Card style=" overflow: hidden" class="p-2 w-full">
            <template #title ><h3 class="text-primary-400 font-medium"> Empezar a Evaluar </h3> </template>
            <template #content>
                <p class="m-0">
                    ¡Comienza a evaluar software ahora!
Tu opinión puede marcar la diferencia. Únete a nosotros y empieza a evaluar aplicaciones de acuerdo con las normas ISO. Contribuye con tus valoraciones y ayuda a otros a tomar decisiones informadas. No hay mejor momento que ahora para compartir tu experiencia. ¡Empieza a evaluar y transforma la manera en que usamos el software!
                </p>
            </template>
            <template #footer>
                <div class="flex flex-row-reverse gap-4 mt-1">
                    <Button as="router-link" label="Empezar"  to="/login" severity=""  class="w-fit bg-primary-500" icon="pi pi-chevron-right" icon-pos="right"/>
                </div>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';

</script>