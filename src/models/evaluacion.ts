import { Usuario } from "./usuario";
import { Software } from "./software";
import { Comentario } from "./comentario";
import { Respuesta } from "./respuesta";
import { RespuestaCustom } from "./respuesta_custom";

export interface Evaluacion {
    id: number;
    usuario: Usuario;
    software: Software;
    comentario: Comentario;
    respuestas: Respuesta[];
    respuestasCustom: RespuestaCustom[];
    createdAt: Date;
    updatedAt: Date;
}