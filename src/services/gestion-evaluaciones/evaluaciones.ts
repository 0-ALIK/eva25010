import { AxiosService } from "../axios";
import { Evaluacion } from "../../models/evaluacion";
import { useAuthStore } from "../../stores/gestion-usuario/auth-store";

export interface EvaluacionResponse{
    evaluacion: Evaluacion[];
};

export class EvaluacionesService{ 
    private module: string = '/gestion-evaluaciones';

    public async getEvaluacionByUser(): Promise<Evaluacion[] | null> {
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

}