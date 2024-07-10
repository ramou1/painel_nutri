import { Injectable, Injector } from "@angular/core";
import { FirestoreService } from "./firestore.service";

@Injectable({
  providedIn: 'root'
})
export class RecipesService extends FirestoreService {

  constructor(injector: Injector) {
    super(injector);
    this.setCollectionRef('recipes');
  }

  async deleteRecipe(ingredientId: string) {
    return await this.deleteDocument(ingredientId);
  }
}