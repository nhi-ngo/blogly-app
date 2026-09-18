import { apiService } from './apiService';
import { AuthResponse, LoginRequest } from '../types/Auth';

class AuthService {
  private api = apiService.getApi();

  public async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  }

  public logout(): void {
    localStorage.removeItem('token');
  }
}

export const authService = new AuthService();
