import { Injectable, Injector } from "@angular/core";
import { FirestoreService } from "./firestore.service";

@Injectable({
    providedIn: 'root'
  })
  export class PartnersService extends FirestoreService {
  
    constructor(injector: Injector) {
      super(injector);
      this.setCollectionRef('partners');
    }
  }