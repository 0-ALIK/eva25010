import { Software } from "./software";
import { Categoria } from "./categoria";

export interface SoftwareCategoria {
    id: number;
    software: Software;
    categoria: Categoria;
    createdAt: Date;
    updatedAt: Date;
}