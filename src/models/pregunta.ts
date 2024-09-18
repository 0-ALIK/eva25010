import { Subcategoria } from "./subcategoria";
import { Respuesta } from "./respuesta";

export interface Pregunta {
    id: number;
    descripcion: string; 
    subcategoria: Subcategoria;
    respuestas: Respuesta[];
    createdAt: Date;
    updatedAt: Date;
}