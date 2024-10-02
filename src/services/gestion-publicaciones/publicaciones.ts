import { AxiosService } from "../axios";
import { Software } from "../../models/software";
import { useAuthStore } from "../../stores/gestion-usuario/auth-store";
import { Licencia } from "../../models/licencia";
import { TipoSoftware } from "../../models/tipo_software";
import { Tecnologia } from "../../models/tecnologia";

export interface SoftwareResponse {
    softwares: Software[];
}

export interface LicenciaResponse {
    licencias: Licencia[];
}

export interface TecnologiaResponse {
    tecnologias: Tecnologia[];
}

export interface TipoResponse {
    tipos: TipoSoftware[];
}

//Clase
export class PublicacionesService {

    private module: string = '/gestion-publicaciones';

    public async obtenerAllPublicaciones(): Promise<Software[] | null> {
        try {
            const response = await AxiosService.http.get<SoftwareResponse>(this.module);
            return response.data.softwares;
        } catch (error) {
            console.error('Error fetching publicaciones:', error);
            return null;
        }
    }

    public async obtenerPublicacionById(id: number): Promise<Software | null> {
        try {
            const response = await AxiosService.http.get<Software>(`${this.module}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching publicacion with ID ${id}:`, error);
            return null;
        }
    }

    public async obtenerPublicacionesByUsuario(): Promise<Software[] | null> {
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

//Gets para los filtros
    public async obtenerLicencias(): Promise<Licencia[] | null> {
        try {
            const response = await AxiosService.http.get<LicenciaResponse>(`${this.module}/software/licencias`);
            return response.data.licencias;

        } catch (error) {
            console.error('Error fetching licencias:', error);
            return null;
        }
    };

    public async obtenerTipos(): Promise<TipoSoftware[] | null> {
        try {
            const response = await AxiosService.http.get<TipoResponse>(`${this.module}/software/tipos`);
            return response.data.tipos;

        } catch (error) {
            console.error('Error fetching Tipos de software:', error);
            return null;
        }
    };

    public async obtenerTecnologias(): Promise<Tecnologia[] | null> {
        try {
            const response = await AxiosService.http.get<TecnologiaResponse>(`${this.module}/software/tecnologias`);
            return response.data.tecnologias;

        } catch (error) {
            console.error('Error fetching tecnologias:', error);
            return null;
        }
    };
}