import { Software } from "./software";
import { Categoria } from "./categoria";
import { PreguntaCustom } from "./pregunta_custom";

export interface SoftwareCategoria {
    id: number;
    software: Software;
    categoria: Categoria;
    preguntaCustom: PreguntaCustom;
    createdAt: Date;
    updatedAt: Date;
}