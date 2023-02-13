import * as readlineSync from 'readline-sync';
import { AuthenticationService } from './services/authService';
import { DataStore } from './services/storeService';
import { InstagramUser } from 'interfaces/User';

class InstagramUi {
  constructor(
    private authenticationService: AuthenticationService,
    private dataStore: DataStore,
  ) {}

  async run(): Promise<void> {
    while (true) {
      console.log('Bienvenue sur Instagram');
      console.log('1. Créer un compte');
      console.log('2. Se connecter');
      console.log('3. Sortie');

      const option = readlineSync.question('Choisissez une option :');
      if (option === '1') {
        this.createAccount();
      } else if (option === '2') {
        await this.logIn();
      } else if (option === '3') {
        break;
      } else {
        console.log('Option non valide, essayez à nouveau');
      }
    }
  }

  private createAccount(): void {
    const username = readlineSync.question('Entrez votre nom d\'utilisateur :');
    const password = readlineSync.question('Entrez votre mot de passe :', {
      hideEchoBack: true,
    });

    try {
      const user = this.authenticationService.signUp(username, password);
      this.dataStore.saveUser(user, username);
      console.log('Compte créé avec succès');
    } catch (error: any) {
      console.error(error.message);
    }
  }

  private async logIn(): Promise<void> {
    const username = readlineSync.question('Entrez votre nom d\'utilisateur :');
    const password = readlineSync.question('Entrez votre mot de passe :', {
      hideEchoBack: true,
    });

    try {
      const user = this.authenticationService.logIn(username, password);
      console.log('Bienvenue, ' + username);
      await this.showUserMenu(user);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  private async showUserMenu(user: InstagramUser): Promise<void> {
    while (true) {
      console.log('1. Créer un post simple');
      console.log('2. Créer un post complexe');
      console.log('3. voir mon profile');
      console.log('4. Sortie');

      const option = readlineSync.question('Choisissez une option :');
      if (option === '1') {
        const text = readlineSync.question('Entrez le texte de l\'article :');
        user.createPost({ text });
        console.log('Poste créé avec succès');
      } else if (option === '2') {
        const text = readlineSync.question('Entrez le texte de l\'article :');

        const imageUrl = readlineSync.question(
          'Saisissez l\'URL de l\'image :',
        );
        user.createPost({ text, imageUrl });
        console.log('Poste créé avec succès');
      } else if (option === '3') {
        console.log('Ton profile: ');
        user.getPosts().forEach((post) => {
          console.log(
            '- ' + post.text + (post.imageUrl ? ` (${post.imageUrl})` : ''),
          );
        });
      } else if (option === '4') {
        break;
      } else {
        console.log('Option non valide, essayez à nouveau');
      }
    }
  }
}

const authenticationService = new AuthenticationService();
const dataStore = new DataStore();

const instagramUi = new InstagramUi(authenticationService, dataStore);
instagramUi.run();
