import { createRouter, createWebHistory } from "vue-router";

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
                    component: () => import("./pages/gestion-usuario/Perfil.vue"),
                    meta: { auth: true },
                    children:[
                        {
                            path: "software", //hacer una page para cargar la cargar para poder iterarla
                            component: () => import('./components/shared/CardSoftware.vue'),
                            meta: { auth: true },
                        },
                        {
                            path: "evaluaciones",
                            component: () => import('./components/gestion-usuario/CardEvaluaciones.vue'),
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
                    path: "software/:id",
                    component: () => import("./pages/gestion-publicaciones/VerPublicación.vue"),
                },
                
                {
                    path: "evaluar/:id",
                    component: () => import('./pages/evaluaciones/Evaluaciones.vue'),
                },

                {
                    path: "/catalogo",
                    component: () => import('./pages/gestion-publicaciones/Catalogo.vue'),
                },
                {
                    path: "/resultados",
                    component: () => import('./pages/evaluaciones/Resultados.vue'),
                }
            ]
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

export default router;