import { Profesion } from "./profesion";
import { Software } from "./software";
import { Evaluacion } from "./evaluacion";

export interface Usuario {
    id?: number;  
    nombre?: string;
    apellido?: string;
    correo?: string;
    password?: string;
    cargo?: string;        
    foto?: string;         
    profesion?: Profesion; 
    software?: Software[]; 
    evaluaciones?: Evaluacion[];
    createdAt?: Date;
    updatedAt?: Date;   
}
