<template>
    <div class="bg-surface-800 p-4 rounded-md w-20 h-full flex flex-col justify-between items-center">
        <div class="flex flex-col justify-between items-center gap-8">
            <!-- Logo -->
            <figure>
                <img src="/logo.png" alt="Logo">
            </figure>
    
            <!-- Links -->
            <div class="flex flex-col justify-center gap-2">
                <div>
                    <RouterLink to="/">
                        <Button icon="pi pi-home" aria-label="Filter" v-if="route.path === '/'"/>  
                        <Button icon="pi pi-home" text aria-label="Filter" v-if="route.path !== '/'"/>  
                    </RouterLink>
                </div>
            
                <!-- <div>
                    <RouterLink to="/products">
                        <Button icon="pi pi-home" aria-label="Filter" v-if="route.path === '/'"/>  
                        <Button icon="pi pi-home" text aria-label="Filter" v-if="route.path !== '/'"/>  
                    </RouterLink>
                </div> -->
            </div>
        </div>

        <!-- Usuario -->
        <div>
            <Divider />
            
            <!-- session inactiva -->
            <div v-if="false">
                <Avatar icon="pi pi-user" size="large" style="background-color: #ece9fc; color: #2a1261" shape="circle" @click="toggle" />
                <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true" />
            </div>

            <!-- session activa -->
            <div v-if="true" class="flex flex-col gap-2 items-center">
                <Avatar icon="pi pi-user" size="large" style="background-color: #ece9fc; color: #2a1261" shape="circle" />
                <Button icon="pi pi-power-off" text />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import Divider from 'primevue/divider';
import Menu from 'primevue/menu';
import { ref } from 'vue';
import { MenuItem } from 'primevue/menuitem';
import { useRoute } from 'vue-router';

const route = useRoute();

const menu = ref<typeof Menu | null>(null);

const menuItems = ref<MenuItem[]>([
    {
        label: 'Auth',
        items: [
            {
                label: 'Login',
                icon: 'pi pi-fw pi-user',
                command: () => {
                    console.log('Login');
                }
            },
            {
                label: 'Register',
                icon: 'pi pi-fw pi-user-plus',
                command: () => {
                    console.log('Register');
                }
            }
        ]
    }
]);

function toggle(event: Event): void {
    menu.value?.toggle(event);
}
</script>