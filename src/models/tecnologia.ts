import { SoftwareTecnologia } from "./software_tecnologia";

export interface Tecnologia {
    id: number;
    nombre: string;
    softwareTecnologias: SoftwareTecnologia[];
    createdAt: Date;
    updatedAt: Date;
}