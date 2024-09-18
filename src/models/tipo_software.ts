import { SubtipoSoftware } from "./subtipo_software";

export interface TipoSoftware {
    id: number;
    nombre: string;
    subtiposSoftware: SubtipoSoftware[];
    createdAt: Date;
    updatedAt: Date;
}