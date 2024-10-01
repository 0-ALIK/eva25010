<template>
    <div
        class="h-screen w-screen overflow-hidden bg-main bg-cover bg-no-repeat"
    >   <div class="flex justify-center align-middle items-center p-[10%]">
            <article class="p-space gap-4 flex flex-col h-fit m-outer w-[550px] bg-gray-950/50 rounded-2xl border border-l-gray-500 border-t-gray-300 border-b-gray-900 border-r-gray-700 shadow-2xl backdrop-blur-sm ">
                <h2 class="text-4xl">Bienvenido a EVA 25010</h2>
                <p class="text-gray-400 text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde aliquam minus ipsam autem fugiat assumenda consectetur ab voluptatum, nulla laudantium provident dolore expedita. Corrupti eveniet voluptatibus possimus deserunt non ea.</p>
                <p class="text-base">¿No tienes cuenta? <a href="/Registro" class="text-primary-500 underline decoration-solid"> Registrate Ahora!</a></p>
            </article>
            <form @submit.prevent="enviarDatos"  class="m-inner w-[600px] flex flex-col items-center p-space bg-gray-950/50 rounded-2xl border border-l-gray-500 border-t-gray-300 border-b-gray-900 border-r-gray-700 shadow-2xl backdrop-blur-sm ">
                <h1 class=" pt-14 pb-10 pl-6 m-5 inline-block text-7xl">Iniciar Sesion</h1>
                <section class="flex justify-between flex-col gap-4 px-space">
                    <article class="text-xl pb-10"><!--correo de usuario-->
                        <label for="username">Nombre de Usuario</label>
                            <div class="flex flex-col">
                                <IconField>
                                    <InputIcon class="pi pi-user text-primary-500" style="color: var(--p-Sprimary-500)" />
                                    <InputText v-model="usuario.nombre" placeholder="Nombre" type="text" class="w-[400px]" />
                                </IconField>
                            </div>
                    </article> 
                    <article class="text-xl pb-10"><!--contraseña de usuario-->
                        <label for="username">Contraseña</label>
                        <div class="flex flex-col">
                            <IconField>
                                <InputIcon class="pi pi-lock text-primary-500" style="color: var(--p-Sprimary-500)" />
                                <InputText v-model="usuario.password" placeholder="*********" type="password" class="w-[400px]"/>
                            </IconField>
                        </div>
                    </article>
                    <div class="w-[100%] flex flex-col items-center">
                        <Button @click="enviarDatos" icon="pi pi-chevron-right" class="text-white w-fit" label="Inisiar Sesion"/>    
                    </div>
                </section>
            </form>
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
import { alpha, maxLength, minLength, required} from '@vuelidate/validators';

const toastStore = useToastStore();

const usuario = ref({
    nombre: '',
    password: ''
});

const rules = {
    nombre:{
        required,
        alpha
    },
    password:{
        required,
        minLength: minLength(6),
        maxLength: maxLength(12)
    }  
};

const vuelidate = useVuelidate(rules, usuario);
    
async function enviarDatos() {
    vuelidate.value.$touch();  

    if (vuelidate.value.$invalid) {
        toastStore.showToast('error', 'Error', 'Faltan campos por completar')
    }
    
    try {
   
    const response = await new AuthService().login(usuario.value.nombre,usuario.value.password);
    console.log('Respuesta del servidor:', response);

  
    if (response && response.usuario) {
        toastStore.showToast('success', 'Inicio de sesión exitoso', 'Usuario ha iniciado sesión correctamente.');
        
        // Ejemplo: router.push('/dashboard'); // Dependiendo de tu configuración de rutas.
    } else {
  
        toastStore.showToast('error', 'Error de inicio de sesión', 'Correo o contraseña incorrectos.');
    }
} catch (error) {

    console.error('Error al iniciar sesión:', error);
    toastStore.showToast('error', 'Error del servidor', 'No se pudo iniciar sesión.');
}

}
</script>
