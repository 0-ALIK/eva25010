<template>
    <div class="min-h-screen flex flex-col items-center justify-center mb-4">
        <div class="flex justify-between items-center mb-4">
          <button @click="prevCategory"  class="text-teal-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 class="text-lg border-b-4 border-teal-500 w-full">Categoría {{ currentCategory }}</h2>
          <button @click="nextCategory" class="text-teal-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      <div class="w-[65%] h-fit bg-surface-900 flex flex-col rounded-md p-3 gap-4 justify-start items-center border border-surface-800 shadow-2xl ">
            <div class="mt-[60px] border-b-2 border-teal-500 w-[80%] flex flex-col items-center">
                <h1>Preguntas</h1>
            </div>  
            <div class="border border-teal-500 p-4 rounded-lg mt-[20px]">
                <h3 class="mb-4">{{ questions[questionIndex].question }}</h3>
                <div v-for="(option, index) in questions[questionIndex].options" :key="index" class="mb-2 text-teal-500">
                    <label>
                    <input type="radio" :value="option" v-model="selectedAnswer" class="mr-2" />
                    {{ option }}
                    </label>
                </div>
            </div>
  
            <div class="flex justify-between mt-4 mb-[30px]">
                <button @click="prevQuestion" :disabled="questionIndex === 0" class="bg-teal-500 px-4 py-2 rounded-md m-10">
                    <h3>Regresar</h3>
                </button>
                <button @click="nextQuestion" icon="pi pi-chevron-right" :disabled="questionIndex === questions.length - 1" class="bg-teal-500 px-4 py-2 rounded-md m-10">
                    <h3>Siguiente</h3>
                </button>
            </div>
      </div>
    </div>
  </template>
  
  <script>

  export default {
    data() {
      return {
        questionIndex: 0,
        currentCategory: 'x',
        selectedAnswer: null,
        questions: [
          {
            question: "¿El software incluye todas las funcionalidades necesarias para que el usuario logre sus objetivos sin recurrir a soluciones externas?",
            options: [
              "Muy Satisfecho",
              "Satisfecho",
              "Neutral",
              "Insatisfecho",
              "Muy Insatisfecho"
            ]
          },
          {
            question: "¿Al software incluye todas las funcionalidades necesarias para que el usuario logre sus objetivos sin recurrir a soluciones externas?",
            options: [
              "Muy Satisfecho",
              "Satisfecho",
              "Neutral",
              "Insatisfecho",
              "Muy Insatisfecho"
            ]
          },
          {
            question: "¿Ol software incluye todas las funcionalidades necesarias para que el usuario logre sus objetivos sin recurrir a soluciones externas?",
            options: [
              "Muy Satisfecho",
              "Satisfecho",
              "Neutral",
              "Insatisfecho",
              "Muy Insatisfecho"
            ]
          },
          // Aquí puedes añadir más preguntas
        ]
      };
    },
    methods: {
      nextQuestion() {
        if (this.questionIndex < this.questions.length - 1) {
          this.questionIndex++;
          this.selectedAnswer = null; // Resetea la selección
        }
      },
      prevQuestion() {
        if (this.questionIndex > 0) {
          this.questionIndex--;
          this.selectedAnswer = null; // Resetea la selección
        }
      },
      nextCategory() {
        this.currentCategory = 'x + 1'; // Puedes implementar una lógica más compleja para las categorías
      },
      prevCategory() {
        this.currentCategory = 'x - 1'; // Puedes implementar una lógica más compleja para las categorías
      }
    }
  };
  </script>
  
  <style scoped>
  /* Aquí puedes añadir más estilos si es necesario */
  </style>
  