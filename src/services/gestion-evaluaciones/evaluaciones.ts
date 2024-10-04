import { AxiosService } from "../axios";
import { useAuthStore } from "../../stores/gestion-usuario/auth-store";
import { Categoria } from "../../models/categoria";
import { Subcategoria } from "../../models/subcategoria";



export class EvaluacionesService{ 
    private module: string = '/evaluaciones';
    authStore = useAuthStore();

    public async obtenerEvaluacionesPropias(): Promise<any | null> {
        try {
            const authStore = useAuthStore();
            const response = await AxiosService.http.get(this.module + '/propias',{
                headers: {
                    'x-token': authStore.getToken
                }
             });
            return response.data.evaluacion;

        } catch (error) {
            console.error('Error fetching evaluaciones propias:', error);
            return null;
        };
    };

    public async obtenerCategorias(): Promise<Categoria[] | null> {
        try {
            const response = await AxiosService.http.get<Categoria[]>(`${this.module}/categorias`);
            return response.data;
        } catch (error) {
            console.error('Error getting categorias:', error);
            return null;
        }
    };


    public async obtenerSubCategorias(categoriaId: string): Promise<Subcategoria[] | null> {
        try {
            const response = await AxiosService.http.get(`/evaluaciones/subcategorias/${categoriaId}`);
            return response.data; 
        } catch (error) {
            console.error('Error al obtener las subcategorías:', error);
            return null;
        }
    }; 

    public async obtenerPreguntasPorSubcategoria(subcategoriaid: string): Promise<any | null> {
        try {
            const response = await AxiosService.http.get(`${this.module}/preguntas/${subcategoriaid}`, {
                headers: {
                    'x-token': this.authStore.getToken
                } 
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching preguntas:', error);
            return null;
        }
    }

}
