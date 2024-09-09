import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';
import router from './router';

const preset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{indigo.50}',
            100: '{indigo.100}',
            200: '{indigo.200}',
            300: '{indigo.300}',
            400: '{indigo.400}',
            500: '{indigo.500}',
            600: '{indigo.600}',
            700: '{indigo.700}',
            800: '{indigo.800}',
            900: '{indigo.900}',
            950: '{indigo.950}'
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
