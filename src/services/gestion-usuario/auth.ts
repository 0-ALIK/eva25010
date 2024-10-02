import { Usuario } from "../../models/usuario";
import { useAuthStore } from "../../stores/gestion-usuario/auth-store";
import { AxiosService } from "../axios";

interface AuthResponse {
    usuario: Usuario;
    token: string;
}

export class AuthService {

    private module: string = '/gestion-usuario';
    
    public async login(correo: string, password: string): Promise<AuthResponse | null> {
        try {
            const response = await AxiosService.http.post<AuthResponse>(this.module+'/auth/login', {
                correo,
                password
            });

            const authStore = useAuthStore();
            authStore.setToken(response.data.token);
            authStore.setUsuario(response.data.usuario);
            
            return response.data;
        } catch (error) {
            return null;
        }
    }

    public async verify(): Promise<Usuario | null> {
        try {
            const authStore = useAuthStore();

            const response = await AxiosService.http.get<Usuario>(this.module+'/auth/verify', {
                headers: {
                    'x-token': authStore.getToken || ''
                }
            });

            authStore.setUsuario(response.data);
            return response.data;
        } catch (error) {
            return null;
        }
    }

    public async register(usuario: Usuario): Promise<AuthResponse | null> {
        try {
            const response = await AxiosService.http.post<AuthResponse>(this.module+'/auth/register', usuario, {
                validateStatus: function (status) {
                    return status < 500; 
                }
            });
            
            console.log('Éxito');

            if (response.status === 400) {
                console.error('Error de estado:', response.data);
            }
    
            return response.data;        
        } catch (error) {
            console.error('este es el error:', error);
            return null;
        }
    }
}