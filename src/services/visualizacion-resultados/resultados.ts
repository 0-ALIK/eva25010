import { useAuthStore } from "../../stores/gestion-usuario/auth-store";
import { AxiosService } from "../axios";

export class ResultadosService {

    private module: string = '/visualizacion-resultados';

    public async obtenerTotalEvaluaciones(softwareid: number): Promise<any | null> {
        try {
            const authStore = useAuthStore();
            const response = await AxiosService.http.get(`${this.module}/total-evaluaciones/${softwareid}`, {
                headers: {
                    'x-token': authStore.getToken
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching:', error);
            return null;
        }
    }

    public async obtenerPromedioFinal(softwareid: number): Promise<any | null> {
        try {
            const authStore = useAuthStore();
            const response = await AxiosService.http.get(`${this.module}/promedio-final/${softwareid}`,{
                headers: {
                    'x-token': authStore.getToken
                }            });
            return response.data;
        } catch (error) {
            console.error('Error fetching:', error);
            return null;
        }
    };

    public async obtenerPromedioCategoria(softwareid: number, categoriaId: any): Promise<any | null> {
        try {
            const authStore = useAuthStore();
            const response = await AxiosService.http.get(`${this.module}/promedio-final/categoria/${softwareid}/${categoriaId}`, {
                headers: {
                    'x-token': authStore.getToken
                } 
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching:', error);
            return null;
        };
    };

    public async obtenerPromedioSubCategoria(softwareid: number, subcategoriaId: any): Promise<any | null> {
        try {
            const authStore = useAuthStore();
            const response = await AxiosService.http.get(`${this.module}/promedio-final/subcategoria/${softwareid}/${subcategoriaId}`, {
                headers: {
                    'x-token': authStore.getToken
                } 
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching prom sub:', error);
            return null;
        };
    };

    public async obtenerRespuestasPreguntas(softwareId: number, preguntaId: number): Promise<any | null> {
        try {
            const authStore = useAuthStore();
            const response = await AxiosService.http.get(`${this.module}/preguntas/total/${softwareId}/${preguntaId}`, {
                headers: {
                    'x-token': authStore.getToken
                } 
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching:', error);
            return null;
        };
    };

    

}
