<template>
    <div class="bg-surface-900 p-4 rounded-md w-20 h-full flex flex-col justify-between items-center border border-surface-800">
        <div class="flex flex-col justify-between items-center gap-8">
            <!-- Logo -->
            <figure>
                <img src="/logo.png" alt="Logo">
            </figure>
    
            <!-- Links -->
            <div class="flex flex-col justify-center gap-2" v-for="item in sideItems">
                <div v-if="item.route">
                    <RouterLink :to="item.route">
                        <Button :icon="item.icon" :text="route.path !== item.route" :aria-label="item.label"/>  
                    </RouterLink>
                </div>
            </div>
        </div>

        <!-- Usuario -->
        <div>
            <Divider />

            <template v-if="loading">
                <div class="flex flex-col gap-2 items-center">
                    <Skeleton shape="circle" size="3rem"></Skeleton>
                </div>
            </template>
            <template v-else>
                <!-- session inactiva -->
                <div v-if="!sessionActive">
                    <Avatar icon="pi pi-user" size="large" style="background-color: #ece9fc; color: #2a1261" shape="circle" @click="toggle" />
                    <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true" />
                </div>
    
                <!-- session activa -->
                <div v-if="sessionActive" class="flex flex-col gap-2 items-center">
                    <Avatar :image="usuario?.foto || '/user_placeholder.jpg'" size="large" shape="circle" />
                    <Button icon="pi pi-power-off" text @click="onClickLogout" />
                </div>
            </template>            
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import Divider from 'primevue/divider';
import Menu from 'primevue/menu';
import Skeleton from 'primevue/skeleton';
import { onMounted, ref } from 'vue';
import { MenuItem } from 'primevue/menuitem';
import { useRoute, useRouter } from 'vue-router';
import { AuthService } from '../../services/gestion-usuario/auth';
import { useAuthStore } from '../../stores/gestion-usuario/auth-store';
import { useConfirmStore } from '../../stores/shared/confirm-store';
import { useToastStore } from '../../stores/shared/toast-store';

const route = useRoute();

const router = useRouter();

const confirm = useConfirmStore();

const toast = useToastStore();

const authService = new AuthService();

const authStore = useAuthStore();

const usuario = ref(authStore.getUsuario);

const sessionActive = ref(false);

const loading = ref(true);

const sideItems = ref([
    { route: '/', label: 'Home', icon: 'pi pi-home' },
    { route: '/perfil/software', label: 'Software', icon: 'pi pi-code' },
    { route: '/perfil/evaluaciones', label: 'Evaluaciones', icon: 'pi pi-file-check' },
    { route: '/crear', label: 'Agregar', icon: 'pi pi-file-plus' },
    { route: '/catalogo', label: 'Catalogo', icon: 'pi pi-list' },
    { route: '/resultados/resultados', label: 'Resultados', icon: 'pi pi-chart-bar' },

]);

const menu = ref<typeof Menu | null>(null);

const menuItems = ref<MenuItem[]>([
    {
        label: 'Auth',
        items: [
            {
                label: 'Login',
                icon: 'pi pi-fw pi-user',
                command: () => {
                    router.push('/login');
                }
            },
            {
                label: 'Register',
                icon: 'pi pi-fw pi-user-plus',
                command: () => {
                    router.push('/registro');
                }
            }
        ]
    }
]);

function toggle(event: Event): void {
    menu.value?.toggle(event);
}

async function verificarSession(): Promise<void> {
    const response = await authService.verify();
    if (response) {
        usuario.value = authStore.getUsuario;
        sessionActive.value = true;
    }
    loading.value = false;
}

function onClickLogout(): void {
    confirm.showConfirm({
        message: '¿Estás seguro de cerrar sesión?',
        header: 'Cerrar sesión',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancelar',
        rejectProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Cerrar sesión',
            severity: 'danger'
        },
        accept: () => {
            router.push('/');
            authStore.logout();
            sessionActive.value = false;
            toast.showToast('success', 'Sesión cerrada', 'Has cerrado sesión correctamente');
        },
        reject: () => {
            toast.showToast('info', 'Operación cancelada', 'Has cancelado la operación de cerrar sesión');
        }
    })
}

onMounted(async () => {
    await verificarSession();
});
</script>