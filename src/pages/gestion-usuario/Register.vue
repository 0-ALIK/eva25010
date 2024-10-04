<template>
    <div class="h-screen w-screen overflow-hidden bg-main bg-cover bg-no-repeat">
        <div class="flex justify-center align-middle items-center">
            <form @submit.prevent="enviarDatos"  class="m-inner w-fit flex flex-col items-center p-space bg-gray-950/50 rounded-2xl border border-l-gray-500 border-t-gray-300 border-b-gray-900 border-r-gray-700 shadow-2xl backdrop-blur-sm ">
                <h1 class=" pt-14 pb-4 pl-6 m-5 inline-block">Registro</h1>
                <div class="flex p-space">
                    <section class="flex justify-between flex-col gap-4 px-space ">
                    <!--Datos generales-->
                        <article><!--Nombre de usuario-->
                            <label for="username">Nombre de Usuario</label>
                            <div class="flex flex-col">
                                <IconField>
                                    <InputIcon class="pi pi-user text-primary-500" style="color: var(--p-Sprimary-500)" />
                                    <InputText v-model="usuario.nombre" placeholder="Nombre" type="text" />
                                </IconField>
                            </div>
                        </article>

                        <article><!--apellido de usuario-->
                            <label for="username">Apellido de Usuario</label>
                            <div class="flex flex-col">
                                <IconField>
                                    <InputIcon class="pi pi-user text-primary-500" style="color: var(--p-Sprimary-500)" />
                                    <InputText v-model="usuario.apellido"  placeholder="Apellido" type="text" />
                                </IconField>
                            </div>
                        </article>

                        <article><!--correo de usuario-->
                            <label for="username">Correo electrónico</label>
                            <div class="flex flex-col gap-2">
                                <IconField>
                                    <InputIcon class="pi pi-at text-primary-500" style="color: var(--p-Sprimary-500)" />
                                    <InputText v-model="usuario.correo"  placeholder="correo@correo.com" type="email" />
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
                                    <InputText v-model="usuario.password" placeholder="*********" type="password" />
                                </IconField>
                                <ul class="mx-6">
                                    <li class="list-disc"><small id="password-help" class="text-xs decoration-dotted">Convinación de mayúsculas y minúsculas.</small> </li>
                                    <li class="list-disc"><small id="password-help" class="text-xs decoration-dotted">Algún número.</small> </li>
                                    <li class="list-disc"><small id="password-help" class="text-xs decoration-dotted">de 6 a 12 caracteres.</small> </li>
                                </ul>
                            </div>
                        </article>

                        <article><!--confirmar contraseña-->
                            <label for="username">Confirmar contraseña</label>
                            <div class="flex flex-col gap-2">
                                <IconField>
                                    <InputIcon class="pi pi-lock text-primary-500" style="color: var(--p-Sprimary-500)" />
                                    <InputText v-model="usuario.confirmPassword" invalid="confirmPassword" placeholder="*********" type="password" />
                                </IconField>
                            </div>

                            <small v-if="usuario.confirmPassword=== usuario.password">Las contraseñas coinciden</small>
                            <small v-else>Las contraseñas no coinciden</small>
                        </article>
                    </section>
                </div>
            
                <Button :disabled="usuario.password !== usuario.confirmPassword"  @click="enviarDatos" icon="pi pi-chevron-right" class="text-white" label="Registrar" />
            </form>

            <article class="p-space gap-4 flex flex-col h-fit m-outer w-fit bg-gray-950/50 rounded-2xl border border-l-gray-500 border-t-gray-300 border-b-gray-900 border-r-gray-700 shadow-2xl backdrop-blur-sm ">
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
import { useToastStore } from '../../stores/shared/toast-store';
import useVuelidate from '@vuelidate/core';
import { alpha, email, maxLength, minLength, required, sameAs } from '@vuelidate/validators';
import { useAuthStore } from '../../stores/gestion-usuario/auth-store';
import router from '../../router';

const toastStore = useToastStore();

const usuario = ref({
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    confirmPassword: ''
});

const rules = {
    nombre:{
        required,
        alpha
    },
    apellido:{
        required,
        alpha
    },
    correo:{
        required,
        email
    },
    password:{
        required,
        minLength: minLength(6),
        maxLength: maxLength(12)
    },
    confirmPassword: { 
        required, 
        sameAsPassword: sameAs(usuario.value.password)
    }  
};

const vuelidate = useVuelidate(rules, usuario);
    
async function enviarDatos() {
    vuelidate.value.$touch();  

    if (vuelidate.value.$invalid) {
        //toastStore.showToast('error', 'Error', 'Faltan campos por completar')
    }
    
    try {
    const response = await new AuthService().register(usuario.value);
    console.log('Respuesta del servidor:', response);
    const authStore = useAuthStore();

    if (response && response.usuario) {

        const token = response.token; 
        authStore.setUsuario(response.usuario); 
        authStore.setToken(token);

        toastStore.showToast('success', 'Registro exitoso', 'Usuario registrado correctamente, redirigiendo');
        setTimeout(()=> {
            router.push('/'); 
        }, 1000)
    } else {
        toastStore.showToast('error', 'Error del servidor', 'No se pudo registrar el usuario.');
    }
} catch (error) {
    console.error('Error al registrar:', error);
    toastStore.showToast('error', 'Error', 'Hubo un problema al registrar el usuario.');
}

}
</script>


