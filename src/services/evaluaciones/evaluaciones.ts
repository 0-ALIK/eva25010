import { Categoria } from "../../models/categoria";
import { AxiosService } from "../axios";

export class EvaluacionesService {
    private module: string = '/evaluaciones';

    public async obtenerCategorias(): Promise<Categoria[] | null> {
        try {
            const response = await AxiosService.http.get<Categoria[]>(`${this.module}/categorias`);
            return response.data;
        } catch (error) {
            console.error('Error getting categorias:', error);
            return null;
        }
    }
}