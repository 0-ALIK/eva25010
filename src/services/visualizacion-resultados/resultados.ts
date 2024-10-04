import { useAuthStore } from "../../stores/gestion-usuario/auth-store";
import { AxiosService } from "../axios";

export class ResultadosService {

    private module: string = '/visualizacion-resultados';

    public async obtenerTotalEvaluaciones(softwareid: string): Promise<any | null> {
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

    public async obtenerPromedioFinal(softwareid: string): Promise<any | null> {
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

    public async obtenerPromedioCategoria(softwareid: string, categoria: string): Promise<any | null> {
        try {
            const authStore = useAuthStore();
            const response = await AxiosService.http.get(`${this.module}/promedio-final/categoria/${softwareid}/${categoria}`, {
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

    public async obtenerPromedioSubCategoria(softwareid: string, subcategoriaId: string): Promise<any | null> {
        try {
            const authStore = useAuthStore();
            const response = await AxiosService.http.get(`${this.module}/promedio-final/subcategoria/${softwareid}/${subcategoriaId}`, {
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

    public async obtenerRespuestasPreguntas(softwareId: string, preguntaId: number): Promise<any | null> {
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
