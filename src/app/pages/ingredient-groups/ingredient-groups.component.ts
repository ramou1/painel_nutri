import { Component, Injector, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { INGREDIENT_CATEGORIES } from 'src/app/constants/data.const';
import { MSG_CONST } from 'src/app/constants/message.const';
import { INGREDIENT_GROUPS } from 'src/app/constants/mock.const';
import { IngredientGroupsModel } from 'src/app/models/ingredients-model';
import { BasePage } from 'src/app/services/base-page.service';

@Component({
  selector: 'app-ingredient-groups',
  templateUrl: './ingredient-groups.component.html',
  styleUrls: ['./ingredient-groups.component.scss']
})
export class IngredientGroupsComponent extends BasePage implements OnInit {

  public editing: boolean = false;
  public groupsForm!: FormGroup;
  public groups: any;
  public choosedGroup: IngredientGroupsModel | null = null;
  public categories = INGREDIENT_CATEGORIES;
  columns = ['Título', 'Slug', 'Qtd. Ingredientes', 'Categoria', 'Ações'];

  constructor(public injector: Injector) {
    super(injector);
  }

  async ngOnInit() {
    await this.createForms();
    await this.getIngredientGroups();
  }

  createForms() {
    this.groupsForm = this.fb.group({
      id: [],
      title: ['', Validators.required],
      slug: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  public async getIngredientGroups(): Promise<void> {
    try {
      this.groups = INGREDIENT_GROUPS;
    } catch (e) {
      console.error(e);
    }
  }

  openDialog(dialog: TemplateRef<any>, group?: IngredientGroupsModel) {
    this.dialogSrvc.open(dialog);
    this.groupsForm.reset();
    this.editing = false;
    this.choosedGroup = null;

    if (group) {
      this.editing = true;
      this.choosedGroup = group;
      this.groupsForm.patchValue(group);
    }
  }

  openDeleteConfirmation(dialog: TemplateRef<any>) {
    this.dialogSrvc.open(dialog);
  }

  async deleteIngredientGroup(groupId: any) {
    try {
      await this.groups.splice(groupId, 1);
      await this.getIngredientGroups();
    } catch (e) {
      await this.toastrSrvc.danger(MSG_CONST.VIEW_DATA_ERROR, MSG_CONST.ERROR_TITLE, { icon: '' });
      console.error(e);
    }
  }

  async addOrUpdateIngredientGroup() {
    try {
      await this.toastrSrvc.success(null, MSG_CONST.SAVE_DATA_OK, { icon: '' });
      await this.getIngredientGroups();
      this.groupsForm.reset();
    } catch (e) {
      await this.toastrSrvc.danger(null, MSG_CONST.SAVE_DATA_ERROR, { icon: '' });
      console.error(e);
    }
  }

}
