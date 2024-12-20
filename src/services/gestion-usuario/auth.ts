import { Profesion } from "../../models/profesion";
import { Usuario } from "../../models/usuario";
import { useAuthStore } from "../../stores/gestion-usuario/auth-store";
import { AxiosService } from "../axios";

interface AuthResponse {
    usuario: Usuario;
    token: string;
}

export interface UsuarioResponse {
    usuarios: Usuario[];
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
                    'x-token': authStore.getToken || localStorage.getItem('token') || ''
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

    public async actualizarDatosUsuario(formData: FormData): Promise<Usuario | null> {
        try {
            const authStore = useAuthStore();
            const response = await AxiosService.http.put(this.module +'/usuarios', 
                formData,  
                {
                    headers: {
                        'x-token': authStore.getToken,  
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            console.log('Respuesta completa de la API desde el servicio:', response);
            return response.data;
    
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            return null;
        }
    }

    public async obtenerAllUsuarios(): Promise<Usuario[] | null> {
        try {
            const response = await AxiosService.http.get<UsuarioResponse>(`${this.module}/usuarios`);
            return response.data.usuarios;
        } catch (error) {
            console.error('Error fetching usuarios:', error);
            return null;
        }
    }

    public async cambiarFoto(fomrData: FormData): Promise<any> {
        try {
            const authStore = useAuthStore();
            const response = await AxiosService.http.post(this.module+'/usuarios/foto', fomrData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-token': authStore.getToken || ''
                }
            });

            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    public async obtenerProfesiones(): Promise<Profesion[] | null> {
        try {
            const response = await AxiosService.http.get<Profesion[]>(this.module+'/usuarios/profesiones');
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

}