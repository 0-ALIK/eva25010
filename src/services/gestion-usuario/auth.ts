import { Usuario } from "../../models/usuario";
import { useAuthStore } from "../../stores/gestion-usuario/auth-store";
import { AxiosService } from "../axios";

interface AuthResponse {
    usuario: Usuario;
    token: string;
}

export class AuthService {

    private module: string = '/gestion-usuario';
    
    public async login(email: string, password: string): Promise<AuthResponse | null> {
        try {
            const response = await AxiosService.http.post<AuthResponse>(this.module+'/auth/login', {
                email,
                password
            });

            const authStore = useAuthStore();
            authStore.setToken(response.data.token);
            authStore.setUsuario(response.data.usuario);
            
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    public async register(usuario: Usuario): Promise<AuthResponse | null> {
        try {
            const response = await AxiosService.http.post<AuthResponse>(this.module+'/auth/register', usuario);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}