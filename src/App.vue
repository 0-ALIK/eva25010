<template>
    <div>
        <Toast />
        <ConfirmDialog />
        
        <RouterView />
    </div> 
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
</script>