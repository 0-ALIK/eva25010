import { Usuario } from "../../models/usuario";
import { AxiosService } from "../axios";

interface AuthResponse {
    usuario: Usuario;
    token: string;
}

export class AuthService {

    private module: string = '/gestion-usuario';
    
    public async login(email: string, password: string): Promise<AuthResponse | undefined> {
        try {
            const response = await AxiosService.http.post(this.module+'/auth/login', {
                email,
                password
            });
            return response.data as AuthResponse;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    public async register(usuario: Usuario): Promise<AuthResponse | undefined> {
        try {
            const response = await AxiosService.http.post(this.module+'/auth/register', usuario);
            return response.data as AuthResponse;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }
}