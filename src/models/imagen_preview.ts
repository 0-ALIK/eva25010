import { Software } from "./software";

export interface ImagenPreview {
    id: number;
    imagen: string;
    software: Software;
    createdAt: Date;
    updatedAt: Date;
}