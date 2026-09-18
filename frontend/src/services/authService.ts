import { apiService } from './apiService';
import { AuthResponse, AuthUser, LoginRequest, RegisterRequest } from '../types/Auth';

class AuthService {
  private api = apiService.getApi();

  public async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  }

  public async register(credentials: RegisterRequest): Promise<AuthUser> {
    const response = await this.api.post<AuthUser>('/auth/register', credentials);

    return response.data;
  }
}

export const authService = new AuthService();
