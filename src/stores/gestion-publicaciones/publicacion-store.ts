import { defineStore } from "pinia";

export const usePublicacionStore = defineStore('publicacion', () => {

    let publicacion: any = {};

    function setPublicacion(newPublicacion: any): void {
        publicacion = newPublicacion;
    }

    function setCategorias(newCategorias: any): void {
        publicacion.categorias = newCategorias;
    }

    function getPublicacion() {
        return publicacion;
    }

    return {
        setPublicacion,
        setCategorias,
        getPublicacion
    }

});