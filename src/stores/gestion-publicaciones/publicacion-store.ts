import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Categoria } from "../../models/categoria";

export const usePublicacionStore = defineStore('publicacion', () => {

    let publicacion: any = {};

    const categoriasElegidas = ref<Categoria[]>([]);

    function setPublicacion(newPublicacion: any): void {
        publicacion = newPublicacion;
    }

    function setCategorias(newCategorias: any): void {
        publicacion.categorias = newCategorias;
    }

    function getPublicacion() {
        return publicacion;
    }

    function setCategoriasElegidas(categorias: Categoria[]) {
        categoriasElegidas.value = categorias;
    }    

    function getCategoriasElegidas() {
        return computed(() => categoriasElegidas.value);
    }

    return {
        setPublicacion,
        setCategorias,
        getPublicacion,
        setCategoriasElegidas,
        getCategoriasElegidas
    }

});