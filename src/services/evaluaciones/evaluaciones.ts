import { Categoria } from "../../models/categoria";
import { Pregunta } from "../../models/pregunta";
import { PreguntaCustom } from "../../models/pregunta_custom";
import { Subcategoria } from "../../models/subcategoria";
import { useAuthStore } from "../../stores/gestion-usuario/auth-store";
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

    public async obtenerSubcategorias(categoriaId: string): Promise<Subcategoria[] | null> {
        try {
            const response = await AxiosService.http.get<Subcategoria[]>(`${this.module}/subcategorias/${categoriaId}`);
            return response.data;
        } catch (error) {
            console.error('Error getting subcategorias:', error);
            return null;
        }
    }

    public async obtenerPreguntas(subcategoriaId: string): Promise<Pregunta[] | null> {
        try {
            const response = await AxiosService.http.get<Pregunta[]>(`${this.module}/preguntas/${subcategoriaId}`);
            return response.data;
        } catch (error) {
            console.error('Error getting preguntas:', error);
            return null;
        }
    }

    public async obtenerPreguntasCustom(softwareid: number): Promise<PreguntaCustom[] | null> {
        try {
            const response = await AxiosService.http.get<PreguntaCustom[]>(`${this.module}/preguntas-custom/${softwareid}`);
            return response.data;
        } catch (error) {
            return null;
        }
    }

    public async evaluar(data: any, softwareid: number): Promise<any | null> {
        try {
            const authStore = useAuthStore();
            const response = await AxiosService.http.post(`${this.module}/evaluar/${softwareid}`, data, {
                headers: {
                    'x-token': authStore.getToken || ''
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error evaluating:', error);
            return null;
        }
    }
}