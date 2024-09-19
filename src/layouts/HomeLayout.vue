<template>
    <div class="p-4 h-screen flex">
        <Sidebar />
        <div class="mx-8">
            <RouterView />
        </div>
    </div>
</template>

<script lang="ts" setup>
import Sidebar from "../components/shared/Sidebar.vue";
</script>
