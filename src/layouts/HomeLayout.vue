<template>
    <div class="p-4 h-screen flex relative">
        <Sidebar />
        <div class="ml-28 mr-8 w-full">
            <RouterView />
        </div>
    </div>
</template>

<script lang="ts" setup>
import Sidebar from "../components/shared/Sidebar.vue";
</script>
