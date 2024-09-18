import { Software } from "./software";

export interface Licencia {
    id: number;

    nombre: string;

    software: Software[];

    createdAt: Date;

    updatedAt: Date;
}