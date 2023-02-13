import { InstagramUser } from '../interfaces/User';

export class DataStore {
  private users: { [username: string]: InstagramUser } = {};

  saveUser(user: InstagramUser, username: string): void {
    this.users[username] = user;
  }

  getUser(username: string): InstagramUser {
    return this.users[username];
  }
}
