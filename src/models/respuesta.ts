import { Evaluacion } from "./evaluacion";
import { Pregunta } from "./pregunta";

export interface Respuesta {
    id: number;
    valor: number;
    pregunta: Pregunta;
    evaluacion: Evaluacion;
    createdAt: Date;
    updatedAt: Date;
}