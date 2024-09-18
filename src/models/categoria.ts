import { Subcategoria } from "./subcategoria";
import { SoftwareCategoria } from "./software_categoria";
import { PreguntaCustom } from "./pregunta_custom";

export interface Categoria {
    id: string;
    nombre: string;
    subcategorias: Subcategoria[];
    softwareCategorias: SoftwareCategoria[];
    preguntasCustom: PreguntaCustom[];
    createdAt: Date;
    updatedAt: Date;
}