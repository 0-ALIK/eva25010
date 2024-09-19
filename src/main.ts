import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import 'primeicons/primeicons.css';
import PrimeVue from 'primevue/config';
import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';
import router from './router';

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
        colorScheme: {
            light: {
                surface: {}
            },
            dark: {
                surface: {}
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
    .mount('#app');
