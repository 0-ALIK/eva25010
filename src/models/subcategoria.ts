import { Categoria } from "./categoria";
import { Pregunta } from "./pregunta";

export interface Subcategoria {
    id: string;
    nombre: string;
    categoria: Categoria;
    preguntas: Pregunta[];
    createdAt: Date;
    updatedAt: Date;
}