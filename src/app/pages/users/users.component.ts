import { Injector, OnInit, TemplateRef } from '@angular/core';
import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { PLANS } from 'src/app/constants/data.const';
import { MSG_CONST } from 'src/app/constants/message.const';
import { USERS } from 'src/app/constants/mock.const';
import { BasePage } from 'src/app/services/base-page.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BasePage implements OnInit {

  public planForm!: FormGroup;
  public plans = PLANS;
  checked: boolean = false;
  users: any;
  isEditing: boolean = false;
  columns = ['Criado em', 'Nome', 'E-mail', 'Plano', 'Gênero', 'Objetivo', 'TMB', 'GET', 'Peso', 'Idade', 'Nível', 'Coins', 'Restrições', 'Tipo de Usuário', 'Academia', 'Ações'];

  constructor(public injector: Injector) {
    super(injector);
  }

  async ngOnInit() {
    this.users = await USERS;
    await this.createForms();
  }

  createForms() {
    this.planForm = this.fb.group({
      id: [],
      plan: ['', Validators.required],
    });
  }

  getGenderName(gender: string): string {
    switch (gender) {
      case 'female': return 'Feminino';
      case 'male': return 'Masculino';
      default: return ''
    }
  }

  getObjectiveName(objective: number): string {
    switch (objective) {
      case 0: return 'Perder peso';
      case 1: return 'Ganhar peso';
      case 2: return 'Manter peso';
      default: return ''
    }
  }

  toggle(checked: boolean) {
    this.checked = checked;
  }

  async changeUserRole(user: any, role: string) {
    try {
      user.role = role;
      await this.toastrSrvc.success(null, MSG_CONST.CHANGE_ROLE_OK, { icon: '' });
    } catch (e) {
      await this.toastrSrvc.danger(null, MSG_CONST.CHANGE_ROLE_ERROR, { icon: '' });
      console.error(e);
    }
  }

  openDeleteConfirmation(dialog: TemplateRef<any>) {
    this.dialogSrvc.open(dialog);
  }

  async deleteUser(userId: any) {
    try {
      this.users.splice(this.users.findIndex((user: any) => user.id === userId), 1);
      await this.toastrSrvc.success(null, MSG_CONST.DELETED_DATA_OK, { icon: '' });
    } catch (e) {
      await this.toastrSrvc.danger(MSG_CONST.DELETED_DATA_ERROR, MSG_CONST.ERROR_TITLE, { icon: '' });
      console.error(e);
    }
  }

  openPlanDialog(dialog: TemplateRef<any>) {
    this.dialogSrvc.open(dialog);
  }

  async savePlan(userId: string) {
    try {
      const formData = this.planForm.value;
      await this.toastrSrvc.success(null, MSG_CONST.PLAN_CHANGE_OK, { icon: '' });
      this.planForm.reset();
    } catch (e) {
      await this.toastrSrvc.danger(null, MSG_CONST.SAVE_DATA_ERROR, { icon: '' });
      console.error(e);
    }
  }

}
