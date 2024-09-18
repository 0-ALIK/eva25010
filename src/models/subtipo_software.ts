import { TipoSoftware } from "./tipo_software";
import { Software } from "./software";

export interface SubtipoSoftware {
    id: number;
    nombre: string;
    tipoSoftware: TipoSoftware;
    software: Software[];
    createdAt: Date;
    updatedAt: Date;
}