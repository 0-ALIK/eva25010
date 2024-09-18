<template>
    <div>
        <RouterView />
    </div> 
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { AuthService } from './services/gestion-usuario/auth';


onMounted(async () => {
    const authService = new AuthService();
    const data = await authService.login('admin', 'admin');
    console.log(data);
});
</script>