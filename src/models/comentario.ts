import { Evaluacion } from "./evaluacion";


export interface Comentario {
    id: number;
    descripcion: string;
    evaluacion: Evaluacion;
    createdAt: Date;
    updatedAt: Date;
}