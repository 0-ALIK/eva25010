import { createRouter, createWebHistory } from "vue-router";
//import { AuthService } from "./services/gestion-usuario/auth";
//import { useToastStore } from "./stores/shared/toast-store";
//import { useAuthStore } from "./stores/gestion-usuario/auth-store";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: () => import("./layouts/HomeLayout.vue"),
            children: [
                {
                    path: "",
                    component: () => import("./pages/evaluaciones/Home.vue")
                },
                
                {
                    path: "perfil",
                    component: () => import("./layouts/PerfilLayout.vue"),
                    meta: { auth: true },
                    children:[
                        {
                            path: "software", //hacer una page para cargar la cargar para poder iterarla
                            component: () => import('./pages/gestion-publicaciones/SoftwaresPropios.vue'),
                            meta: { auth: true },
                        },
                        {
                            path: "evaluaciones",
                            component: () => import('./pages/evaluaciones/EvaluacionesPropias.vue'),
                            meta: { auth: true },
                        }
                    ]
                },

                {
                    path: "crear",
                    component: () => import("./pages/gestion-publicaciones/CrearEditar.vue"),
                    meta: { auth: true },
                },

                {
                    path: "editar/:id",
                    component: () => import("./pages/gestion-publicaciones/CrearEditar.vue"),
                    meta: { auth: true },
                },

                {
                    path: "software/:id",
                    component: () => import("./pages/gestion-publicaciones/VerPublicación.vue"),
                },
                
                {
                    path: "evaluar/:id",
                    component: () => import('./pages/evaluaciones/Evaluaciones.vue'),
                    meta: { auth: true }
                },

                {
                    path: "/catalogo",
                    component: () => import('./pages/gestion-publicaciones/Catalogo.vue'),
                },
                {
                    path: "/resultados/:id",
                    component: () => import('./layouts/ResultadosLayout.vue'),
                    meta: { auth: true },
                    children:[
                        {
                            path: "resultados",
                            component: () => import('./pages/visualizacion-resultados/Resultados.vue'),
                            meta: { auth: true },
                        },
                        {
                            path: "comentarios",
                            component: () => import('./pages/visualizacion-resultados/Comentarios.vue'),
                            meta: { auth: true },
                        }
                    ]
                },

                {
                    path: '/not-found',
                    component: () => import('./pages/404.vue')
                }
            ],
        },
        {
            path: "/login",
            component: () => import("./pages/gestion-usuario/Login.vue")
        },
        {
            path: "/registro",
            component: () => import("./pages/gestion-usuario/Register.vue")
        },
    ]
});

/* router.beforeEach(async (to, from, next) => {
    if(to.matched.some(record => record.meta.auth)){

        const authService = new AuthService();
        const toast = useToastStore();

        const response = await authService.verify();
        
        if(response){
            next();
        } else {
            toast.showToast('info', 'Sesión expirada', 'Por favor inicie sesión nuevamente');
            next("/login");
        }

        return;
    }

    next();
}); */

export default router;