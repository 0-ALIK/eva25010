import { Subcategoria } from "./subcategoria";
import { SoftwareCategoria } from "./software_categoria";

export interface Categoria {
    id: string;
    nombre: string;
    subcategorias: Subcategoria[];
    softwareCategorias: SoftwareCategoria[];
    createdAt: Date;
    updatedAt: Date;
}