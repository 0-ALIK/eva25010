import { AxiosService } from "../axios";
import { Software } from "../../models/software";
import { useAuthStore } from "../../stores/gestion-usuario/auth-store";

export interface SoftwareResponse {
    softwares: Software[];
}

export class PublicacionesService {

    private module: string = '/gestion-publicaciones';

    public async getAllPublicaciones(): Promise<Software[] | null> {
        try {
            const response = await AxiosService.http.get<SoftwareResponse>(this.module);
            return response.data.softwares;
        } catch (error) {
            console.error('Error fetching publicaciones:', error);
            return null;
        }
    }

    public async getPublicacionById(id: number): Promise<Software | null> {
        try {
            const response = await AxiosService.http.get<Software>(`${this.module}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching publicacion with ID ${id}:`, error);
            return null;
        }
    }

    public async getPublicacionesByUsuario(): Promise<Software[] | null> {
        try {
            const authStore = useAuthStore();
            const usuario = authStore.getUsuario;

            const response = await AxiosService.http.get(`${this.module}?usuarioId=${usuario?.id}`);
            return response.data;
        } catch (error) {
            console.error('Error obteniendo las publicaciones del usuario:', error);
            return null;
        }
    }

    
    public async createPublicacion(data: Software): Promise<SoftwareResponse | null> {
        try {
            const response = await AxiosService.http.post<SoftwareResponse>(this.module, data);
            return response.data;
        } catch (error) {
            console.error('Error creating publicacion:', error);
            return null;
        }
    }

    public async updatePublicacion(id: number, data: Software): Promise<SoftwareResponse | null> {
        try {
            const response = await AxiosService.http.put<SoftwareResponse>(`${this.module}/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(`Error updating publicacion with ID ${id}:`, error);
            return null;
        }
    }

    public async deletePublicacion(id: number): Promise<boolean> {
        try {
            await AxiosService.http.delete(`${this.module}/${id}`);
            return true;
        } catch (error) {
            console.error(`Error deleting publicacion with ID ${id}:`, error);
            return false;
        }
    }
}
