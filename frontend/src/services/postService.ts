import { apiService } from './apiService';
import { Post } from '../types/Post';

class PostService {
  private api = apiService.getApi();

  public async getPosts(params: { categoryId?: string; tagId?: string }): Promise<Post[]> {
    const response = await this.api.get<Post[]>('/posts', { params });
    return response.data;
  }

  public async getPost(id: string): Promise<Post> {
    const response = await this.api.get<Post>(`/posts/${id}`);
    return response.data;
  }
}

export const postService = new PostService();
