import { Software } from "./software";
import { Tecnologia } from "./tecnologia";

export interface SoftwareTecnologia {
    id: number;
    software: Software;   
    tecnologia: Tecnologia;
    createdAt: Date;
    updatedAt: Date;
}