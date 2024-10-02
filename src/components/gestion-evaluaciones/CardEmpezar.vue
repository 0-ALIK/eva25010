<template>
    <div>
        <Card style=" overflow: hidden" class="p-2 w-full">
            <template #title ><h3 class="text-primary-400 font-medium"> Empezar a Evaluar </h3> </template>
            <template #content>
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                    quas!
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