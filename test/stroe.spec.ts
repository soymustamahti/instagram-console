import { DataStore } from '../src/services/storeService'
import { InstagramUser } from '../src/interfaces/User';

describe('DataStore', () => {
  let dataStore: DataStore;
  let user: InstagramUser;

  beforeEach(() => {
    dataStore = new DataStore();
    user = new InstagramUser();
  });

  describe('saveUser', () => {
    it('should save the user', () => {
      const username = 'john_doe';
      dataStore.saveUser(user, username);
      expect(dataStore.getUser(username)).toEqual(user);
    });
  });

  describe('getUser', () => {
    it('should return the user', () => {
      const username = 'john_doe';
      dataStore.saveUser(user, username);
      expect(dataStore.getUser(username)).toEqual(user);
    });

    it('should return undefined if the user does not exist', () => {
      const username = 'john_doe';
      expect(dataStore.getUser(username)).toBeUndefined();
    });
  });
});
