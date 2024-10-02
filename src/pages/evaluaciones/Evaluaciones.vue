<template>
  <div class="min-h-screen flex flex-col items-center justify-center mb-4">
    <div class="flex justify-between items-center mb-4">
      <Button icon="pi pi-chevron-right" aria-label="Save" />
      <h2 class="text-lg border-b-4 border-teal-500 w-full p-5 items-center">categoria</h2>
      <Button icon="pi pi-chevron-left" aria-label="Save" />
    </div>

    <div class="w-[65%] h-fit bg-surface-900 flex flex-col rounded-md p-3 gap-4 justify-start items-center border border-surface-800 shadow-2xl ">
      <div class="mt-[60px] border-b-2 border-teal-500 w-[80%] flex flex-col items-center">
        <h1>Preguntas</h1>
      </div>
      <div class="border border-teal-500 p-4 rounded-lg mt-[20px]">
        <h3 class="mb-4">Preguntas</h3>
          <div class="mb-2 text-teal-500">
                  <label>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt, quisquam eos. In sunt ipsa officia quidem sequi molestiae ipsam minus illo quos, nam rem voluptate, dolor nisi optio vel? Ea.
                  </label>
          </div>
      </div>

      <div class="flex justify-between mt-4 mb-[30px]">
        <Button label="Regresar" icon="pi pi-chevron-left" class="bg-teal-500 px-4 py-2 rounded-md m-10" />
        <Button label="Siguiente" icon="pi pi-chevron-right" class="bg-teal-500 px-4 py-2 rounded-md m-10" />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import 'primeicons/primeicons.css'
import Button from 'primevue/button';
</script>
