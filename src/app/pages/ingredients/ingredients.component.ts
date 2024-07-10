import { Component, Injector, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { INGREDIENT_CATEGORIES, INGREDIENT_RESTRICTIONS, INGREDIENT_SHOWCASES } from 'src/app/constants/data.const';
import { MSG_CONST } from 'src/app/constants/message.const';
import { INGREDIENT_GROUPS, INGREDIENTS } from 'src/app/constants/mock.const';
import { IngredientsModel } from 'src/app/models/ingredients-model';
import { BasePage } from 'src/app/services/base-page.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})

export class IngredientsComponent extends BasePage implements OnInit {

  filteredIngredientGroups: any[] = [];
  public ingredientGroups: any[] = [];
  public ingredients: any;
  public filteredIngredients: any;
  public ingredientsForm!: FormGroup;
  public importedForm!: FormGroup;
  public editing: boolean = false;
  public choosedIngredient: any;
  public protein: any;
  public fat: any;
  public carbo: any;
  public checkedRestrictions: any[] = [];
  public checkedShowIn: any[] = [];
  public importedTitles: any[] = [];
  public importedData: any[] = [];
  public loading: boolean = false;
  public p: number = 1;
  public categories = INGREDIENT_CATEGORIES;

  columns = ['Título', 'Tipo', 'Grupos', 'Qtd. Porção', 'Valor energético', 'Carboidratos totais', 'Açúcares totais', 'Açúcares adicionados', 'Proteínas', 'Gorduras totais', 'Gorduras saturadas', 'Gorduras trans', 'Fibra alimentar', 'Sódio', 'Restrições', 'Onde Aparecer', 'Ações']
  importColumn = ['title', 'type', 'groups', 'totalPortion', 'energeticValue', 'totalCarbohydrates', 'totalSugars', 'addedSugars', 'proteins', 'totalFat', 'saturatedFat', 'transFats', 'dietaryFiber', 'sodium', 'restrictions', 'showIn']
  restrictions = INGREDIENT_RESTRICTIONS;
  showcases = INGREDIENT_SHOWCASES;

  constructor(public injector: Injector) {
    super(injector);
  }

  async ngOnInit() {
    this.createForms();
    await this.getIngredients();
    await this.getIngredientGroups();
  }

  createForms() {
    this.ingredientsForm = this.fb.group({
      id: [],
      image: [''],
      title: ['', Validators.required],
      type: ['', Validators.required],
      groups: [''],
      totalPortion: ['', Validators.required],
      energeticValue: [''],
      totalCarbohydrates: [''],
      totalSugars: [''],
      addedSugars: [''],
      proteins: [''],
      totalFat: [''],
      saturatedFat: [''],
      transFats: [''],
      dietaryFiber: [''],
      sodium: [''],
      restrictions: [],
      favorited: false,
      showIn: [''],
    });

    this.importedForm = this.fb.group({
      title: ['', Validators.required],
      type: [''],
      groups: [''],
      totalPortion: [''],
      energeticValue: [''],
      totalCarbohydrates: [''],
      totalSugars: [''],
      addedSugars: [''],
      proteins: [''],
      totalFat: [''],
      saturatedFat: [''],
      transFats: [''],
      dietaryFiber: [''],
      sodium: [''],
      restrictions: [],
      showIn: [''],
    });
  }

  public async getIngredients(): Promise<void> {
    try {
      this.ingredients = INGREDIENTS;
      this.filteredIngredients = this.ingredients;
    } catch (e) {
      console.error(e);
    }
  }

  public async getIngredientGroups(): Promise<void> {
    try {
      this.ingredientGroups = await INGREDIENT_GROUPS;
    } catch (e) {
      console.error(e);
    }
  }

  public filterIngredients(evt: any): void {
    const removeAccents = (str: string) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const searchTerm = removeAccents(evt.target.value);

    if (searchTerm === '') {
      this.filteredIngredients = this.ingredients;
    } else {
      this.filteredIngredients = this.ingredients.filter((data: any) => {
        const titleWithoutAccents = removeAccents(data.title.toLowerCase());
        return titleWithoutAccents.indexOf(searchTerm.toLowerCase()) > -1;
      });
    }
  }

  public filterGroupList(evt?: any): void {
    const searchTerm = evt.target.value;

    if (searchTerm === '') {
      this.filteredIngredientGroups = [];
    }
    else {
      this.filteredIngredientGroups = this.ingredientGroups.filter((group: any) =>
        group.title.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 4);
    }
  }

  onIngredientGroupChoose(ingredient: any): void {
    ingredient.isClicked = true;
    this.ingredientsForm.get('groups')?.setValue([ingredient.slug]);
  }

  onGroupRemove(ingredient: any): void {
    this.toastrSrvc.danger(null, MSG_CONST.NOT_AVAILABLE, { icon: '' });
  }

  getGroupTitle(group: string): any {
    const title = this.ingredientGroups.filter((item: any) => item.slug === group)[0]?.title;
    return title || '';
  }

  openImportDialog(dialog: TemplateRef<any>) {
    this.checkedRestrictions = [];
    this.checkedShowIn = [];
    this.filteredIngredientGroups = [];
    this.dialogSrvc.open(dialog);
  }

  openIngredientDialog(dialog: TemplateRef<any>, ingredient?: IngredientsModel) {
    this.editing = false;
    this.choosedIngredient = null;
    this.checkedRestrictions = [];
    this.checkedShowIn = [];
    this.filteredIngredientGroups = [];
    this.dialogSrvc.open(dialog);
    this.ingredientsForm.reset();

    if (ingredient) {
      this.editing = true;
      this.choosedIngredient = ingredient;
      this.checkedRestrictions = ingredient.restrictions;
      this.checkedShowIn = ingredient.showIn;
      this.ingredientsForm.patchValue(ingredient);
    }
  }

  async uploadFile(file: any) {
    const searchTerm = file.files[0];

    try {
      await this.ingredientsSrvc.uploadFile(this.choosedIngredient, file);
      await this.toastrSrvc.success(null, MSG_CONST.EDIT_IMAGE_OK, { icon: '' });
    } catch (e) {
      await this.toastrSrvc.danger(null, MSG_CONST.EDIT_IMAGE_ERROR, { icon: '' });
      console.error(e);
    }
  }

  isChecked(array: string[], value: string): boolean {
    return array?.includes(value) || false;
  }

  checkRestriction(checked: any, type: string) {
    if (checked) {
      this.checkedRestrictions.push(type);
    }
    else {
      this.checkedRestrictions = this.checkedRestrictions.filter(item => item !== type);
    }
  }

  checkShowIn(checked: any, type: string) {
    if (checked) {
      this.checkedShowIn.push(type);
    }
    else {
      this.checkedShowIn = this.checkedShowIn.filter(item => item !== type);
    }
  }

  async deleteIngredient(ingredientId: any) {
    try {
      await this.ingredients.splice(this.ingredients.findIndex((ingre: any) => ingre.id === ingredientId), 1);
      await this.toastrSrvc.success(null, MSG_CONST.DELETED_INGREDIENT_OK, { icon: '' });
    } catch (e) {
      await this.toastrSrvc.danger(null, MSG_CONST.DELETED_INGREDIENT_ERROR, { icon: '' });
      console.error(e);
    }
  }

  async addOrUpdateIngredient() {
    try {
      const formData = this.ingredientsForm.value;
      formData.restrictions = this.checkedRestrictions;
      formData.showIn = this.checkedShowIn;
      await this.ingredientsSrvc.addOrUpdateIngredients(formData);
      await this.toastrSrvc.success(null, MSG_CONST.SAVE_DATA_OK, { icon: '' });
      await this.getIngredients();
      this.ingredientsForm.reset();
      // location.reload();
    } catch (e) {
      await this.toastrSrvc.danger(null, MSG_CONST.SAVE_DATA_ERROR, { icon: '' });
      console.error(e);
    }
  }

  importData(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      this.importedData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      const dataArray = this.importedData as object[];
      this.importedTitles = Object.keys(dataArray[0]);
    };

    reader.readAsBinaryString(file);
  }

  async finalize() {
    const infoToConvert = ['energeticValue', 'totalCarbohydrates', 'totalSugars', 'addedSugars', 'proteins', 'totalFat', 'saturatedFat', 'transFats', 'dietaryFiber', 'sodium'];

    try {
      this.loading = true;
      const formData = this.importedForm.value;
      const newArray = this.importedData.map((item) => {
        const newItem: any = {};
        Object.keys(formData).forEach((colunaIngles) => {
          const colunaPortugues = formData[colunaIngles];
          let value = item[colunaPortugues] || null;
          if (infoToConvert.includes(colunaIngles)) {
            if (!isNaN(parseFloat(value))) {
              value = parseFloat(value);
            } else {
              value = null;
            }
          }
          newItem[colunaIngles] = value;
        });
        return newItem;
      });

      newArray.forEach(async (item) => {
        const groupsArray = item.groups?.replace(/,+$/, '').split(',').map((value: any) => (value.trim())) || [];
        const restrictionsArray = item.restrictions?.replace(/,+$/, '').split(',').map((value: any) => (value.trim())) || [];
        const showcaseArray = item.showIn?.replace(/,+$/, '').split(',').map((value: any) => (value.trim())) || [];
        item.groups = groupsArray;
        item.restrictions = restrictionsArray;
        item.showIn = showcaseArray;
        await this.ingredientsSrvc.addOrUpdateIngredients(item);
      });
      setTimeout(() => this.loading = false, 3000);
      await this.toastrSrvc.success(null, + newArray.length + MSG_CONST.IMPORT_DATA_OK, { icon: '' });
      await this.getIngredients();
    } catch (e) {
      await this.toastrSrvc.danger(null, MSG_CONST.IMPORT_DATA_ERROR, { icon: '' });
      console.error(e);
    }
  }

}