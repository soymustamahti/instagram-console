import { Post } from './Post';

export abstract class User {
  abstract createPost(post: Post): void;
  abstract getPosts(): Post[];
}

export class InstagramUser extends User {
  private posts: Post[] = [];

  createPost(post: Post): void {
    this.posts.push(post);
  }

  getPosts(): Post[] {
    return this.posts;
  }
}
