import { apiService } from './apiService';
import { AuthResponse, LoginRequest, RegisterRequest, RegisterResponse } from '../types/Auth';

class AuthService {
  private api = apiService.getApi();

  public async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  }

  public async register(credentials: RegisterRequest): Promise<RegisterResponse> {
    const response = await this.api.post<RegisterResponse>('/auth/register', credentials);
    return response.data;
  }
}

export const authService = new AuthService();
