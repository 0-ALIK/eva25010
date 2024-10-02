<template>
    <div class="h-full p-space flex flex-col bg-surface-900 border border-surface-800 rounded-lg justify-start gap-6 items-center w-fit relative">
      <div class="relative" @mouseenter="showIcon = true" @mouseleave="showIcon = false">
        <Avatar 
          image="/logo.png" 
          class="mr-2 bg-black rounded-full w-44 h-44 align-middle text-center content-center items-center cursor-pointer" 
          unstyled="true" 
          size="xlarge" 
          shape="circle" 
          @click="isModalVisible = true" 
        />
  
        <!-- Icono de tuerca que aparece al pasar el mouse -->
        <i v-if="showIcon" class="pi pi-cog absolute top-0 left-0 flex items-center justify-center w-44 h-44 text-white text-8xl" style="background-color: rgba(0, 0, 0, 0.5); border-radius: 50%;"></i>
      </div>
  
      <article class="flex gap-4 bg-primary-400 p-3 rounded-md"> 
        <h4>{{ usuario?.nombre || 'Nombre' }}</h4>
        <h4>{{ usuario?.apellido || 'Apellido' }}</h4>
      </article>
      <h4>{{ usuario?.profesion || 'Profesión' }}</h4>
  
      <article class="flex gap-4 ">
        <h4>{{ usuario?.cargo || 'Cargo' }}</h4>
      </article>

      <Button label="Editar" @click="editarDatos" icon="pi pi-pen-to-square" />
  
      <Dialog header="Subir Imagen" class="w-[350px] h-[200px] flex flex-colborder border border-teal-500 pl-5" v-model:visible="isModalVisible" :modal="true" :closable="true">
        <div class="flex items-center justify-center">
            <div class="flex w-fit h-fit pr-5 mt-10">
                <FileUpload 
                mode="basic" 
                name="demo[]" 
                url="/api/upload" 
                accept="image/*" 
                :maxFileSize="1000000" 
                @upload="onUpload" 
                :auto="true" 
                chooseLabel="Browse" 
                />
            </div>
            <div class="flex w-fit h-fit p-5 mt-10">
                <Button label="Upload" @click="upload" severity="secondary"/>
            </div>
        </div>
        
        
      </Dialog>
  
      <!-- Modal para editar otros datos del usuario -->
      <EditarUsuario v-model:visible="isVisible" />
    </div>
  
    <div>
      <h3>Cargando perfil...</h3>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import Avatar from 'primevue/avatar';
  import Button from 'primevue/button';
  import Dialog from 'primevue/dialog';
  import FileUpload from 'primevue/fileupload';
  import { useToast } from 'primevue/usetoast';
  import { useAuthStore } from '../../stores/gestion-usuario/auth-store';
  import EditarUsuario from './EditarUsuario.vue';
  
  const authStore = useAuthStore();
  const usuario = authStore.getUsuario;
  
  const isVisible = ref(false);
  const isModalVisible = ref(false);  // Controla la visibilidad del modal
  const showIcon = ref(false);  // Controla si se muestra el ícono de tuerca
  const toast = useToast();
  const fileupload = ref();
  
  function editarDatos() {
    isVisible.value = true;
  }

  const upload = () => {
    fileupload.value.upload();
};
  
  const onUpload = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
  };
  </script>
  
