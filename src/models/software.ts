import { Usuario } from "./usuario";
import { Licencia } from "./licencia";
import { SoftwareCategoria } from "./software_categoria";
import { Evaluacion } from "./evaluacion";
import { SubtipoSoftware } from "./subtipo_software";
import { ImagenPreview } from "./imagen_preview";
import { PreguntaCustom } from "./pregunta_custom";

export interface Software {
    id?: number;
    nombre?: string;
    version?: string;
    portada?: string;
    descripcion?: string;
    usuario?: Usuario;
    subtipoSoftware?: SubtipoSoftware;
    licencia?: Licencia;
    categorias?: SoftwareCategoria[];
    evaluaciones?: Evaluacion[];
    preguntasCustom?: PreguntaCustom[];
    imagenesPreview?: ImagenPreview[];
    createdAt?: Date;
    updatedAt?: Date;
    enlace?: String;
}