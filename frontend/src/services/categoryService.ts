import { apiService } from './apiService';
import { Category } from '../types/Category';

class CategoryService {
  private api = apiService.getApi();

  public async getCategories(): Promise<Category[]> {
    const response = await this.api.get<Category[]>('/categories');

    return response.data;
  }

  public async getCategory(id: string): Promise<Category> {
    const response = await this.api.get<Category>(`/categories/${id}`);
    return response.data;
  }

  public async createCategory(name: string): Promise<Category> {
    const response = await this.api.post<Category>('/categories', { name });
    return response.data;
  }

  public async updateCategory(id: string, name: string): Promise<Category> {
    const response = await this.api.put<Category>(`/categories/${id}}`, { name });
    return response.data;
  }

  public async deleteCategory(id: string): Promise<void> {
    await this.api.delete(`/categories/${id}`);
  }
}

export const categoryService = new CategoryService();
