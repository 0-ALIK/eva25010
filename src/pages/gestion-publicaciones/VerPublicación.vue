<template>
    <div>
        <!-- Titulo -->
        <div class="flex gap-2 mb-8">
            <h2 class="font-bold m-0">Ver Publicación</h2>
            <Chip label="Tipo de software" />
            <p class="self-center">10/01/2024</p>
        </div>

        <div class="flex gap-4">
            
            <div class="p-5 rounded-md bg-surface-900 w-full">
                <section>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id ipsum architecto alias nemo eos velit molestias. Autem eveniet odit culpa, ducimus provident explicabo, amet aut id repudiandae eius delectus sit veritatis aperiam velit mollitia rerum et aliquam obcaecati dolorum quia ipsa eligendi cumque fuga. Est unde distinctio non doloremque assumenda?</p>
                </section>

                <section>
                    
                </section>
            </div>

            <div class="w-1/3">
                <Image src="https://cdn.pixabay.com/photo/2023/10/29/14/37/pumpkins-8350480_1280.jpg" alt="Image" width="500" preview />
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import Chip from 'primevue/chip';
import Image from 'primevue/image';
</script>