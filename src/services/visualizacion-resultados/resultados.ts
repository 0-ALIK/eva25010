import { useAuthStore } from "../../stores/gestion-usuario/auth-store";
import { AxiosService } from "../axios";

const authStore = useAuthStore();
export class ResultadosService {

    private module: string = '/visualizacion-resultados';

    public async obtenerTotalEvaluaciones(softwareid: string): Promise<any | null> {
        try {
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
            const response = await AxiosService.http.get(`${this.module}/promedio-final/${softwareid}`,{
                headers: {
                    'x-token': authStore.getToken
                }            });
            return response.data;
        } catch (error) {
            console.error('Error fetching:', error);
            return null;
        }
    }
    public async obtenerPromedioCategoria(softwareid: string, categoria: string): Promise<any | null> {
        try {
            const response = await AxiosService.http.get(`${this.module}/promedio-final/categoria/${softwareid}/${categoria}`, {
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
}
