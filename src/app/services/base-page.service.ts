import { Platform } from '@angular/cdk/platform';
import { Injectable, Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from './storage.service';
import { NbDialogService, NbSidebarService, NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})

export abstract class BasePage {
  protected router: Router;
  protected fb: FormBuilder;
  protected activatedRoute: ActivatedRoute;
  protected dialogSrvc: NbDialogService;
  protected platform: Platform;
  protected storage: StorageService;
  protected sidebarSrvc: NbSidebarService;
  protected toastrSrvc: NbToastrService;

  constructor(injector: Injector) {
    this.router = injector.get(Router);
    this.fb = injector.get(FormBuilder);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.dialogSrvc = injector.get(NbDialogService);
    this.platform = injector.get(Platform);
    this.sidebarSrvc = injector.get(NbSidebarService);
    this.storage = injector.get(StorageService);
    this.toastrSrvc = injector.get(NbToastrService);
  }

  // nomes das restrições
  getRestrictionName(type: string): string {
    switch (type) {
      case 'allergic': return 'Alérgico à proteína do leite';
      case 'celiac': return 'Celíaco';
      case 'diabetic': return 'Diabético';
      case 'intolerant': return 'Intolerante à lactose';
      case 'vegan': return 'Vegano';
      case 'ovolactovegetarian': return 'Ovolactovegetariano';
      case 'ovovegetarian': return 'Ovovegetariano';
      case 'lactovegetarian': return 'Lactovegetariano';
      case 'irritable': return 'SII';
      default: return ''
    }
  }

  // tipos de refeições
  getUsageName(type: string): string {
    switch (type) {
      case 'breakfast': return 'Café da Manhã';
      case 'morning-snack': return 'Lanche da Manhã';
      case 'lunch': return 'Almoço';
      case 'snack': return 'Lanche';
      case 'dinner': return 'Jantar';
      case 'supper': return 'Ceia';
      default: return ''
    }
  }

  // tipos de alimentos
  getTypeName(type: string): string {
    switch (type) {
      case 'protein': return 'Proteína';
      case 'carbo': return 'Carboidrato';
      case 'fruit': return 'Fruta';
      case 'fat': return 'Gordura';
      case 'salad': return 'Salada';
      default: return 'Outros'
    }
  }
}
