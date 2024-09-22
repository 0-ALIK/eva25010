<template>
    <div class="h-screen w-screen overflow-hidden bg-main bg-cover bg-no-repeat">
        <div class="flex justify-center align-middle items-center">
            <form @submit.prevent="enviarDatos"  class="m-inner w-fit flex flex-col items-center p-space bg-gray-950/50 rounded-2xl border border-l-gray-500 border-t-gray-300 border-b-gray-800 border-r-gray-700 shadow-2xl backdrop-blur-sm ">
                <h1 class=" pt-14 pb-4 pl-6 m-5 inline-block">Registro</h1>
                <div class="flex p-space">
                    <section class="flex justify-between flex-col gap-4 px-space ">
                    <!--Datos generales-->
                        <article><!--Nombre de usuario-->
                            <label for="username">Nombre de Usuario</label>
                            <div class="flex flex-col">
                                <IconField>
                                    <InputIcon class="pi pi-user text-primary-500" style="color: var(--p-Sprimary-500)" />
                                    <InputText v-model="usuario.nombre" placeholder="Search" type="text" />
                                </IconField>
                            </div>
                        </article>

                        <article><!--apellido de usuario-->
                            <label for="username">Apellido de Usuario</label>
                            <div class="flex flex-col">
                                <IconField>
                                    <InputIcon class="pi pi-user text-primary-500" style="color: var(--p-Sprimary-500)" />
                                    <InputText v-model="usuario.apellido"  placeholder="Search" type="text" />
                                </IconField>
                            </div>
                        </article>

                        <article><!--correo de usuario-->
                            <label for="username">Correo electrónico</label>
                            <div class="flex flex-col gap-2">
                                <IconField>
                                    <InputIcon class="pi pi-at text-primary-500" style="color: var(--p-Sprimary-500)" />
                                    <InputText v-model="usuario.correo"  placeholder="Search" type="email" />
                                </IconField>
                            </div>
                        </article> 
                    </section>
                    
                    <!--Segunda columna de datos-->
                    <section class="flex flex-col gap-4 px-space  ">
                        <article><!--contraseña de usuario-->
                            <label for="username">Contraseña</label>
                            <div class="flex flex-col">
                                <IconField>
                                    <InputIcon class="pi pi-lock text-primary-500" style="color: var(--p-Sprimary-500)" />
                                    <InputText v-model="usuario.password" placeholder="Search" type="password" />
                                </IconField>
                                <ul class="mx-6">
                                    <li class="list-disc"><small id="password-help" class="text-xs decoration-dotted">Convinación de mayúsculas y minúsculas.</small> </li>
                                    <li class="list-disc"><small id="password-help" class="text-xs decoration-dotted">Algún número.</small> </li>
                                    <li class="list-disc"><small id="password-help" class="text-xs decoration-dotted">de 8 a 12 caracteres.</small> </li>
                                </ul>
                            </div>
                        </article>

                        <article><!--confirmar contraseña-->
                            <label for="username">Confirmar contraseña</label>
                            <div class="flex flex-col gap-2">
                                <IconField>
                                    <InputIcon class="pi pi-lock text-primary-500" style="color: var(--p-Sprimary-500)" />
                                    <InputText v-model="confirmPassword" invalid="confirmPassword" placeholder="Search" type="password" />
                                </IconField>
                            </div>

                            <small v-if="confirmPassword=== usuario.password">Las contraseñas coinciden</small>
                            <small v-else>Las contraseñas no coinciden</small>
                        </article>
                    </section>
                </div>
            
                <Button :disabled="!validate()"  type="submit" v-bind="enviarDatos" icon="pi pi-chevron-right" class="text-white" label="Registrar"/>
            </form>

            <article class="p-space gap-4 flex flex-col h-fit m-outer w-fit bg-gray-950/50 rounded-2xl border border-l-gray-500 border-t-gray-300 border-b-gray-800 border-r-gray-700 shadow-2xl backdrop-blur-sm ">
                <h2>Bienvenido a EVA 25010</h2>
                <p class="text-gray-400 text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde aliquam minus ipsam autem fugiat assumenda consectetur ab voluptatum, nulla laudantium provident dolore expedita. Corrupti eveniet voluptatibus possimus deserunt non ea.</p>
                <small>¿Ya tienes cuenta? <a href="/login" class="text-primary-500 underline decoration-solid"> Iniciar sesión </a></small>
            </article>
        </div>
    </div>
</template>

<script setup lang="ts">
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import { ref } from 'vue';
import { AuthService } from '../../services/gestion-usuario/auth'
import { Usuario } from '../../models/usuario';
import { useToastStore } from '../../stores/shared/toast-store';

const confirmPassword = ref(''); 

const usuario = ref<Usuario>({
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    });

    function validate() {
        if (confirmPassword.value == usuario.value.password && usuario.value.nombre && usuario.value.apellido && usuario.value.correo && usuario.value.password) {
            return true;
        } else {
            return false;
        }
    }

    async function enviarDatos() {
        console.log(usuario.value); 
        const toastStore = useToastStore();
        confirmPassword.value = usuario.value.password;
        try {
            const response = await new AuthService().register(usuario.value);
            console.log('Respuesta del servidor:', response);
            console.log(response);

            if (response) {
                toastStore.showToast('success', 'Registro exitoso', 'Usuario registrado correctamente.');
                console.log('Registro exitoso', response);
                console.log(response);


            } else {
                toastStore.showToast('error', 'Error', 'No se pudo registrar el usuario.');
                console.log('No se pudo registrar el usuario.', response);
            }
        } catch (error) {
            console.error('Error al registrar:', error);
        }
    }


</script>
