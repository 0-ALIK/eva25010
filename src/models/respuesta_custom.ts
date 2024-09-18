import { PreguntaCustom } from "./pregunta_custom";
import { Evaluacion } from "./evaluacion";

export interface RespuestaCustom {
    id: number;
    valor: number;
    pregunta: PreguntaCustom;
    evaluacion: Evaluacion;
    createdAt: Date;
    updatedAt: Date;
}