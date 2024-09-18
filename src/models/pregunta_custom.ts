import { Categoria } from "./categoria";
import { Software } from "./software";
import { RespuestaCustom } from "./respuesta_custom";

export interface PreguntaCustom {
    id: number;
    descripcion: string;    
    categoria: Categoria;
    software: Software;
    respuestas: RespuestaCustom[];
    createdAt: Date;
    updatedAt: Date;
}