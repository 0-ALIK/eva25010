import { RespuestaCustom } from "./respuesta_custom";
import { SoftwareCategoria } from "./software_categoria";

export interface PreguntaCustom {
    id: number;
    descripcion: string;    
    respuestas: RespuestaCustom[];
    softwareCategoria: SoftwareCategoria;
    createdAt: Date;
    updatedAt: Date;
}