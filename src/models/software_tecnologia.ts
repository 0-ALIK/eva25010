import { Software } from "./software";
import { Tecnologia } from "./tecnologia";


export interface Software_Tecnologia{
    id: string;
    software: Software[];
    tecnologia: Tecnologia[];
}