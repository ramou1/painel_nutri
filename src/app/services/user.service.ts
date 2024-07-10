import { Injectable, Injector } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Auth, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class UserService extends FirestoreService {

  constructor(injector: Injector, private auth: Auth) {
    super(injector);
    this.setCollectionRef('users');
  }

  async getAuthorization() {
    const idToken = await this.getIdToken();
    return { Authorization: 'Bearer ' + idToken };
  }

  async getUserState(): Promise<User | null> {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged((user) => {
        resolve(user);
      })
    })
  }

  async getUid(): Promise<string | any> {
    const user = await this.getUserState();
    if (!user) return null;
    return user?.uid;
  }

  async getIdToken() {
    const user = await this.getUserState();
    if (!user) return null;
    return user.getIdToken(true);
  }
}