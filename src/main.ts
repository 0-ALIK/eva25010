import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import 'primeicons/primeicons.css';
import PrimeVue from 'primevue/config';
import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice';
import router from './router';
import { createPinia } from 'pinia';

const pinia = createPinia();

const preset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{cyan.50}',
            100: '{cyan.100}',
            200: '{cyan.200}',
            300: '{cyan.300}',
            400: '{cyan.400}',
            500: '{cyan.500}',
            600: '{cyan.600}',
            700: '{cyan.700}',
            800: '{cyan.800}',
            900: '{cyan.900}',
            950: '{cyan.950}'
        },

        surface: {
            50:  '{zinc.50}',
            100: '{zinc.100}',
            200: '{zinc.200}',
            300: '{zinc.300}',
            400: '{zinc.400}',
            500: '{zinc.500}',
            600: '{zinc.600}',
            700: '{zinc.700}',
            800: '{zinc.800}',
            900: '{zinc.900}',
            950: '{zinc.950}'
        },

        colorScheme: {
            light: {
                surface: {
                    950: '{zinc.950}',

                }
            },
            dark: {
                surface: {
                    950: '{zinc.950}',

                }
            }
        }
    }
});

createApp(App)
    .use(PrimeVue, {
        theme: {
            preset: preset,
            options: {
                prefix: 'p',
                darkModeSelector: '.dark-mode',
                cssLayer: false
            }
        },
        ripple: true,
    })
    .use(router)
    .use(pinia)
    .use(ToastService)
    .use(ConfirmationService)
    .use(DialogService)
    .mount('#app');
