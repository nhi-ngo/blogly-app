import { apiService } from './apiService';
import { Tag } from '../types/Tag';

class TagService {
  private api = apiService.getApi();

  public async getTags(): Promise<Tag[]> {
    const response = await this.api.get<Tag[]>('/tags');
    return response.data;
  }

  public async createTags(names: string[]): Promise<Tag[]> {
    const response = await this.api.post<Tag[]>('/tags', { names });
    return response.data;
  }

  public async deleteTag(id: string): Promise<void> {
    await this.api.delete(`/tags/${id}`);
  }
}

export const tagService = new TagService();
