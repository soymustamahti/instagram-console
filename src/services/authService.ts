import { InstagramUser } from '../interfaces/User';

export class AuthenticationService {
  users: { [username: string]: InstagramUser } = {};

  signUp(username: string, password: string): InstagramUser {
    if (this.users[username]) {
      throw new Error(`L'utilisateur "${username}" existe déjà.`);
    }

    const user = new InstagramUser();
    this.users[username] = user;
    return user;
  }

  logIn(username: string, password: string): InstagramUser {
    const user = this.users[username];
    if (!user) {
      throw new Error(`L'utilisateur "${username}" n'existe pas.`);
    }
    return user;
  }
}
