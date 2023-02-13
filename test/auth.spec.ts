import { AuthenticationService } from '../src/services/authService';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;

  beforeEach(() => {
    authenticationService = new AuthenticationService();
  });

  describe('signUp', () => {
    it('should add a new user', () => {
      const username = 'john_doe';
      const password = 'password';
      const user = authenticationService.signUp(username, password);
      expect(authenticationService.users[username]).toEqual(user);
    });

    it('should throw an error if the user already exists', () => {
      const username = 'john_doe';
      const password = 'password';
      authenticationService.signUp(username, password);
      expect(() => {
        authenticationService.signUp(username, password);
      }).toThrow(`L'utilisateur "${username}" existe déjà.`);
    });
  });

  describe('logIn', () => {
    it('should return the user', () => {
      const username = 'john_doe';
      const password = 'password';
      const user = authenticationService.signUp(username, password);
      expect(authenticationService.logIn(username, password)).toEqual(user);
    });

    it('should throw an error if the user does not exist', () => {
      const username = 'john_doe';
      const password = 'password';
      expect(() => {
        authenticationService.logIn(username, password);
      }).toThrow(`L'utilisateur "${username}" n'existe pas.`);
    });
  });
});
