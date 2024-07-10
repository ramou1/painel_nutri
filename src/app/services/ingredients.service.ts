import { Injectable, Injector } from '@angular/core';
import { Params } from './firestore.service';
import { FirestoreService } from './firestore.service';
import { IngredientsModel } from '../models/ingredients-model';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { first, take } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class IngredientsService extends FirestoreService {

  public userId: any;

  constructor(injector: Injector, private firestorage: AngularFireStorage, public userSrvc: UserService) {
    super(injector);
  }

  async getUserId() {
    return this.userId = await this.userSrvc.getUid();
  }

  async getIngredient(ingredientId: string) {
    const params: Params = { where: [{ key: 'id', condition: '==', value: ingredientId }] };
    this.setCollectionRef(`ingredients`);
    return await this.load(params);
  }

  async getIngredients(params?: Params) {
    this.setCollectionRef('ingredients');
    return await this.load(params);
  }

  async addOrUpdateIngredients(ingredient: IngredientsModel) {
    this.setCollectionRef('ingredients');
    return await this.addOrUpdateDocument(ingredient);
  }

  async deleteIngredient(ingredientId: string) {
    this.setCollectionRef('ingredients');
    return await this.deleteDocument(ingredientId);
  }

  async uploadFile(ingredient: IngredientsModel, file: File) {
    const fileExtensionDivided = file.name.split('.');
    const ref = this.firestorage.ref(`ingredients/${ingredient.id}/${file.name}.${fileExtensionDivided[fileExtensionDivided.length - 1]}`);
    await ref.put(file);
    ingredient.image = await ref.getDownloadURL().pipe(first(), take(1)).toPromise();
    await this.addOrUpdateDocument(ingredient);
  }
}