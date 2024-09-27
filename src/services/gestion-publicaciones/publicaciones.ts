import { Licencia } from "../../models/licencia";
import { SubtipoSoftware } from "../../models/subtipo_software";
import { TipoSoftware } from "../../models/tipo_software";
import { AxiosService } from "../axios";

export class PublicacionesService {

    private module: string = '/gestion-publicaciones';

    public async crear(data: FormData) {
        try {
            const response = await AxiosService.http.post(this.module, data);
            return response.data;
        } catch (error) {
            console.error('Error creating publicacion:', error);
            return null;
        }
    }

    public async getAllPublicaciones() {
        try {
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
}
