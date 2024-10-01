<template>
    <div>
        <!-- Titulo -->
        <div class="flex gap-2 mb-8">
            <h2 class="font-bold m-0">Ver Publicación</h2>
            <Chip label="Tipo de software" />
            <p class="self-center">10/01/2024</p>
        </div>

        <div class="flex gap-4">
            
            <div class="p-5 rounded-md bg-surface-900 w-full flex flex-col justify-between">
                <section>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id ipsum architecto alias nemo eos velit molestias. Autem eveniet odit culpa, ducimus provident explicabo, amet aut id repudiandae eius delectus sit veritatis aperiam velit mollitia rerum et aliquam obcaecati dolorum quia ipsa eligendi cumque fuga. Est unde distinctio non doloremque assumenda?</p>
                </section>

                <section class="flex justify-between items-center">
                    <div class="flex items-center gap-4">
                        <div class="flex items-center bg-surface-800 p-2 rounded-md w-fit">
                            <Avatar icon="pi pi-user" class="mr-2" size="large" style="background-color: #ece9fc; color: #2a1261" shape="circle" />
                            <div>
                                <p>Nombre Apellido</p>
                                <small class="text-gray-500">Ocupación</small>
                            </div>
                        </div>

                        <div>
                            <Tag icon="pi pi-bookmark" value="1.0.0" class="mr-1"></Tag>
                            <Tag icon="pi pi-id-card" severity="secondary" value="MIT" class="mr-1"></Tag>
                            <Button label="Obtener" icon="pi pi-download" size="small" severity="secondary" />
                        </div>
                    </div>

                    <div>
                        <Button type="button" label="Evaluar" icon="pi pi-search" />
                    </div>
                </section>
            </div>

            <div class="w-3/5">
                <Image src="https://cdn.pixabay.com/photo/2023/10/29/14/37/pumpkins-8350480_1280.jpg" alt="Image" width="500" preview />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Chip from 'primevue/chip';
import Image from 'primevue/image';
import Avatar from 'primevue/avatar';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
</script>