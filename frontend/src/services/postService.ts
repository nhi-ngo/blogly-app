import { apiService } from './apiService';
import { CreatePostRequest, Post, UpdatePostRequest } from '../types/Post';

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

  public async createPost(post: CreatePostRequest): Promise<Post> {
    const response = await this.api.post<Post>('/posts', post);
    return response.data;
  }

  public async updatePost(id: string, post: UpdatePostRequest): Promise<Post> {
    const response = await this.api.put<Post>(`/posts/${id}`, post);
    return response.data;
  }

  public async deletePost(id: string): Promise<void> {
    await this.api.delete(`/posts/${id}`);
  }

  public async getDrafts(): Promise<Post[]> {
    const response = await this.api.get<Post[]>('/posts/drafts');
    return response.data;
  }
}

export const postService = new PostService();
