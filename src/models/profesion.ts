import { Usuario } from "./usuario";

export interface Profesion {
    id: number;
    nombre: string;
    usuarios: Usuario[];
    createdAt: Date;
    updatedAt: Date;
}