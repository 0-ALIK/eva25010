<template>
    <div class="mx-outer flex flex-col gap-2">
        <h2 class="p-1">Home</h2>
        <section class="flex h-fit w-full gap-4">
            <CardEmpezar class="border border-surface-800 rounded-xl p-1 bg-surface-900"/>
            <CardSubir class="border border-surface-800 rounded-xl p-1 bg-surface-900"/>
        </section>

        <section class="bg-surface-900 border border-surface-800 rounded-lg px-4 pb-4">
            <h4 class="font-semibold p-1"> Software´s mas populares </h4>
            <ul>
                <li v-for="publicacion in publicacionesRecientes" :key="publicacion.id">
                    <CardSoftwarePopulares
                        :id="publicacion.id"
                        :portada="publicacion.portada"
                        :nombre="publicacion.nombre"
                        :subtipo-software="publicacion.subtipoSoftware"
                        :created-at="publicacion.createdAt"
                        :descripcion="publicacion.descripcion"
                        :licencia="publicacion.licencia"
                        :version="publicacion.version"
                        :enlace="publicacion.enlace"
                        :foto="publicacion.usuario.foto"
                        :nombreUsuario="publicacion.usuario.nombre"
                        :ApellidoUsuario="publicacion.usuario.apellido"
                    />
                </li>
            </ul>
        </section>

        <section class="flex h-full justify-center items-center gap-2 ">
            <h2 class=" w-fit text-5xl text-center px-6 py-10 bg-primary-400 text-black font-medium rounded-lg items-center">Evaluadores destacados</h2>

            <div class="flex gap-2 text-center">
                <ul>
                    <li v-for="usuario in usuarios" :key="usuario.id">
                        <CardUsuario
                            :id="usuario.id"
                            :foto="usuario.foto"
                            :nombre="usuario.nombre"
                            :apellido="usuario.apellido"
                            :profesion="usuario.profesion"
                        />
                    </li>
                </ul>

            </div>
        </section>

        <section class="py-4 flex flex-col items-center">
            <h2 >Últimos softawre's añadidos</h2>

            <ul class=" flex flex-col gap-2">
                <li v-for="publicacion in publicaciones" :key="publicacion.id" >
                    <CardSoftware
                    :id="publicacion.id"
                    :portada="publicacion.portada"
                    :nombre="publicacion.nombre"
                    :subtipo-software="publicacion.subtipoSoftware"
                    :created-at="publicacion.createdAt"
                    :descripcion="publicacion.descripcion"
                    :licencia="publicacion.licencia"
                    :version="publicacion.version"
                    :enlace="publicacion.enlace"
                />
                </li>
            </ul>
        </section>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CardEmpezar from '../../components/gestion-evaluaciones/CardEmpezar.vue';
import CardSoftwarePopulares from '../../components/gestion-evaluaciones/CardSoftwarePopulares.vue';
import CardSubir from '../../components/gestion-evaluaciones/CardSubir.vue';
import CardUsuario from '../../components/gestion-usuario/CardUsuario.vue';
import CardSoftware from '../../components/shared/CardSoftware.vue';
import { Software } from '../../models/software';
import { PublicacionesService } from '../../services/gestion-publicaciones/publicaciones';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../services/gestion-usuario/auth';

const publicaciones = ref<Software[]>([]);
const usuarios = ref<Usuario[]>([]);
const publicacionesRecientes = ref<any[]>([]);

async function loadPublicaciones() {
  try {
    const publicacionesService = new PublicacionesService();
    const response = await publicacionesService.obtenerAllPublicaciones();

    if (response) {
        publicaciones.value = response;

        publicacionesRecientes.value = publicaciones.value
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 1);

        console.log('Publicaciones más recientes:', publicacionesRecientes.value);
        console.log('Publicaciones: ', publicaciones.value);
    } else {
        console.error('No se encontraron publicaciones.');
    }
  } catch (error) {
    console.error('Error al cargar las publicaciones:', error);
  }
}

async function loadUsuarios() {
  try {
    const usuariosService = new AuthService();
    const response = await usuariosService.obtenerAllUsuarios();

    if (response) {
        usuarios.value = response;
      console.log('Publicaciones del usuario:', usuarios.value);
    } else {
        console.error('No se encontraron publicaciones.');
    }
  } catch (error) {
    console.error('Error al cargar las publicaciones:', error);
  }
}

onMounted(() => {
    loadPublicaciones();
    loadUsuarios();
})
</script>