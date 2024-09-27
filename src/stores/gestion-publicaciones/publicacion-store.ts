import { defineStore } from "pinia";

export const usePublicacionStore = defineStore('publicacion', () => {

    let publicacion: FormData = new FormData();

    function setPublicacion(newPublicacion: FormData): void {
        publicacion = newPublicacion;
    }

    function getPublicacion(): FormData {
        return publicacion;
    }

    return {
        setPublicacion,
        getPublicacion
    }

});