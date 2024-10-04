import { Licencia } from "../../models/licencia";
import { SubtipoSoftware } from "../../models/subtipo_software";
import { Tecnologia } from "../../models/tecnologia";
import { TipoSoftware } from "../../models/tipo_software";
import { AxiosService } from "../axios";
import { Software } from "../../models/software";
import { useAuthStore } from "../../stores/gestion-usuario/auth-store";

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
            const response = await AxiosService.http.get<Software[]>(this.module + '/software');
            return response.data;
        } catch (error) {
            console.error('Error fetching publicaciones:', error);
            return null;
        }
    }

    public async obtenerPublicacionById(id: number): Promise<Software | null> {
        try {
            const response = await AxiosService.http.get<Software>(this.module + '/softwares');
            return response.data;
        } catch (error) {
            console.error(`Error fetching publicacion with ID ${id}:`, error);
            return null;
        }
    }

    public async obtenerPublicacionesPropias(softwareId: any): Promise<Software[] | null> {
        try {
            const authStore = useAuthStore();
            const response = await AxiosService.http.get(`${this.module}/software/propios/${softwareId}`, {
                headers: {
                    'x-token': authStore.getToken || ''
                }
            });
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

    public async getAllPublicaciones() {
        try {//hacer lo del ID
            const response = await AxiosService.http.get(this.module);
            return response.data;
        } catch (error) {
            console.error('Error getting publicaciones:', error);
            return null;
        }
    }

    public async obtenerLicencias(): Promise<Licencia[] | null> {
        try {
            const response = await AxiosService.http.get<Licencia[]>(`${this.module}/software/licencias`);
            return response.data;
        } catch (error) {
            console.error('Error getting licencias:', error);
            return null;
        }
    }

    public async obtenerTipos(): Promise<TipoSoftware[] | null> {
        try {
            const response = await AxiosService.http.get<TipoSoftware[]>(`${this.module}/software/tipos`);
            return response.data;
        } catch (error) {
            console.error('Error getting tipos:', error);
            return null;
        }
    }

    public async obtenerSubtipos(tipoid: number): Promise<SubtipoSoftware[] | null> {
        try {
            const response = await AxiosService.http.get<SubtipoSoftware[]>(`${this.module}/software/subtipos/${tipoid}`);
            return response.data;
        } catch (error) {
            console.error('Error getting subtipos:', error);
            return null;
        }
    }

    public async obtenerTecnologias(): Promise<Tecnologia[] | null> {
        try {
            const response = await AxiosService.http.get<Tecnologia[]>(`${this.module}/software/tecnologias`);
            return response.data;
        } catch (error) {
            console.error('Error getting tecnologias:', error);
            return null;
        }
    }
}