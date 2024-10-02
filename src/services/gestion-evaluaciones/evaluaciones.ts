import { AxiosService } from "../axios";
import { Evaluacion } from "../../models/evaluacion";
import { useAuthStore } from "../../stores/gestion-usuario/auth-store";
import { Categoria } from "../../models/categoria";

export interface EvaluacionResponse{
    evaluacion: Evaluacion[];
};

export interface CategoriaResponse{
    categoria: Categoria[];
};

export class EvaluacionesService{ 
    private module: string = '/evaluaciones';

    public async obtenerEvaluacionByUser(): Promise<Evaluacion[] | null> {
        try {
            const authStore = useAuthStore();
            const usuario = authStore.getUsuario;
            const response = await AxiosService.http.get(`${this.module}?usuarioId=${usuario?.id}`);
            return response.data.evaluacion;

        } catch (error) {
            console.error('Error fetching evaluaciones:', error);
            return null;
        };
    };

    public async obtenerCategorias(): Promise<Categoria[] | null> {
        try {
            const response = await AxiosService.http.get(`${this.module}/categorias`);
            return response.data.categoria;

        } catch (error) {
            console.error('Error fetching categorias:', error);
            return null;
        }
    };
}
