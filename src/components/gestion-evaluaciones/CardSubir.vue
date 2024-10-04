<template>
    <div>
        <Card style=" overflow: hidden" class="p-2 w-full">
            <template #title ><h3 class="text-primary-400 font-medium"> Subir producto de software </h3> </template>
            <template #content>
                <section class="flex gap-1">
                    <p class="m-0">
                        ¡Comparte tu software con el mundo!
                        ¿Tienes una aplicación que deseas que otros evalúen? Sube tu software y permite que nuestra comunidad lo valore según los estándares ISO. Tu producto merece ser visto y revisado. Con cada evaluación, no solo recibirás valiosos comentarios, sino que también contribuirás a elevar la calidad del software en el mercado. ¡No esperes más, súbelo ahora y haz que tu trabajo brille!
                    </p>
                    <i class="pi pi-upload text-surface-800" style="font-size: 5rem"></i>

                </section>
            </template>
            <template #footer>
                <div class="flex flex-row-reverse gap-4 mt-1">
                    <Button as="router-link" to="/crear" label="Subir" severity=""  class="w-fit bg-primary-500" icon="pi pi-chevron-right" icon-pos="right"/>
                </div>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';

</script>