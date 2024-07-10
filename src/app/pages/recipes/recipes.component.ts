import { ChangeDetectionStrategy, Component, ElementRef, Injector, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { NbTagComponent, NbTagInputDirective } from '@nebular/theme';
import { INGREDIENT_RESTRICTIONS, INGREDIENT_USAGES } from 'src/app/constants/data.const';
import { MSG_CONST } from 'src/app/constants/message.const';
import { INGREDIENTS, RECIPES } from 'src/app/constants/mock.const';
import { IngredientsModel } from 'src/app/models/ingredients-model';
import { BasePage } from 'src/app/services/base-page.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent extends BasePage implements OnInit {
  filteredIngredients: any[] = [];
  public searchForm!: FormGroup;
  public recipesForm!: FormGroup;
  public importedForm!: FormGroup;
  public recipes: any[] = [];
  public filteredRecipes: any[] = [];
  public choosedIngredients: any[] = [];
  public editing: boolean = false;
  public choosedRecipe: any;
  public protein: any;
  public fat: any;
  public carbo: any;
  public checkedRestrictions: any[] = [];
  public checkedUsed: any[] = [];
  public importedTitles: any[] = [];
  public importedData: any[] = [];
  public showMacros: boolean = false;
  public loading: boolean = false;
  public p: number = 1;
  public energeticValueSum = 0;
  public totalCarbohydratesSum = 0;
  public totalSugarsSum = 0;
  public addedSugarsSum = 0;
  public totalPortionSum = 0;
  public proteinsSum = 0;
  public totalFatSum = 0;
  public saturatedFatSum = 0;
  public transFatsSum = 0;
  public dietaryFiberSum = 0;
  public sodiumSum = 0;
  public addedIngredient: any;
  public ingredients: any = INGREDIENTS;

  tableColumns = ['Título', 'Passo-a-Passo', 'Ingredientes', 'Qtd. Porção', 'Valor energético', 'Carboidratos totais', 'Açúcares totais', 'Açúcares adicionados', 'Proteínas', 'Gorduras totais', 'Gorduras saturadas', 'Gorduras trans', 'Fibra alimentar', 'Sódio', 'Restrições', 'Usado em', 'Ações']
  columns = ['Título', 'Passo-a-Passo', 'ID dos Ingredientes', 'Qtd. Porção Ingredientes', 'Qtd. Porção Receita', 'Usado em']
  importColumn = ['title', 'description', 'ingredients', 'ingredientPortions', 'totalPortion', 'usedIn']
  restrictions = INGREDIENT_RESTRICTIONS;
  usages = INGREDIENT_USAGES;
  @ViewChild(NbTagInputDirective, { read: ElementRef }) tagInput: ElementRef<HTMLInputElement> | any;

  constructor(public injector: Injector) {
    super(injector);
  }

  async ngOnInit() {
    await this.createForms();
    await this.getRecipes();
  }

  createForms() {
    this.searchForm = this.fb.group({
      ingredient: ['', Validators.required],
      ingredPortion: [100, Validators.required]
    });

    this.recipesForm = this.fb.group({
      id: [],
      image: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      totalPortion: [''],
      ingredients: [],
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
      usedIn: ['']
    });

    this.importedForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      ingredients: [],
      ingredientPortions: [''],
      totalPortion: [''],
      restrictions: [],
      usedIn: [],
    });
  }

  toggle(checked: boolean) { this.showMacros = checked; }

  public async getRecipes(): Promise<void> {
    try {
      this.showMacros = false;
      this.choosedIngredients = [];
      this.recipes = RECIPES;
      this.filteredRecipes = this.recipes;
    } catch (e) {
      console.error(e);
    }
  }

  public filterRecipes(evt: any): void {
    const removeAccents = (str: string) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const searchTerm = removeAccents(evt.target.value);

    if (searchTerm === '') {
      this.filteredRecipes = this.recipes;
    } else {
      this.filteredRecipes = this.recipes.filter((data: any) => {
        const titleWithoutAccents = removeAccents(data.title.toLowerCase());
        return titleWithoutAccents.indexOf(searchTerm.toLowerCase()) > -1;
      });
    }
  }

  public filterIngredientsList(evt?: any): void {
    const searchTerm = evt.target.value;

    if (searchTerm === '') {
      this.filteredIngredients = [];
    }
    else {
      this.filteredIngredients = this.ingredients.filter((ingredient: any) =>
        ingredient.title.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 6);
    }
  }

  onIngredientChoose(ingredient: any): void {
    ingredient.isClicked = true;
    this.searchForm.get('ingredient')?.setValue(ingredient);
  }

  onIngredientAdd() {
    this.filteredIngredients = [];
    const formData = this.searchForm.value;
    this.addedIngredient = formData.ingredient;

    this.recipesForm.patchValue({ totalPortion: this.totalPortionSum });
    this.addedIngredient.energeticValue = (this.addedIngredient.energeticValue * formData.ingredPortion) / 100;
    this.addedIngredient.totalCarbohydrates = (this.addedIngredient.totalCarbohydrates * formData.ingredPortion) / 100;
    this.addedIngredient.totalSugars = (this.addedIngredient.totalSugars * formData.ingredPortion) / 100;
    this.addedIngredient.addedSugars = (this.addedIngredient.addedSugars * formData.ingredPortion) / 100;
    this.addedIngredient.proteins = (this.addedIngredient.proteins * formData.ingredPortion) / 100;
    this.addedIngredient.totalFat = (this.addedIngredient.totalFat * formData.ingredPortion) / 100;
    this.addedIngredient.saturatedFat = (this.addedIngredient.saturatedFat * formData.ingredPortion) / 100;
    this.addedIngredient.transFats = (this.addedIngredient.transFats * formData.ingredPortion) / 100;
    this.addedIngredient.dietaryFiber = (this.addedIngredient.dietaryFiber * formData.ingredPortion) / 100;
    this.addedIngredient.sodium = (this.addedIngredient.sodium * formData.ingredPortion) / 100;
    this.addedIngredient.totalPortion = formData.ingredPortion;

    this.totalPortionSum += formData.ingredPortion;
    this.energeticValueSum += this.addedIngredient.energeticValue;
    this.totalCarbohydratesSum += this.addedIngredient.totalCarbohydrates;
    this.totalSugarsSum += this.addedIngredient.totalSugars;
    this.addedSugarsSum += this.addedIngredient.addedSugars;
    this.proteinsSum += this.addedIngredient.proteins;
    this.totalFatSum += this.addedIngredient.totalFat;
    this.saturatedFatSum += this.addedIngredient.saturatedFat;
    this.transFatsSum += this.addedIngredient.transFats;
    this.dietaryFiberSum += this.addedIngredient.dietaryFiber;
    this.sodiumSum += this.addedIngredient.sodium;

    this.addedIngredient?.restrictions.map((newRestriction: any) => {
      if (!this.checkedRestrictions.includes(newRestriction)) {
        this.checkedRestrictions.push(newRestriction);
      }
    });

    this.recipesForm.patchValue({ totalPortion: this.totalPortionSum });
    this.choosedIngredients.push(this.addedIngredient);
  }

  onIngredientRemove(tagToRemove: NbTagComponent): void {
    const ingredientToRemove = this.choosedIngredients.filter(ingred => {
      return tagToRemove.text.includes(ingred.title);
    });

    const index = this.choosedIngredients.indexOf(ingredientToRemove[0]);

    this.choosedIngredients.splice(index, 1);
    this.totalPortionSum = this.recipesForm.get('totalPortion')?.value - ingredientToRemove[0].totalPortion;
    this.energeticValueSum -= ingredientToRemove[0].energeticValue;
    this.totalCarbohydratesSum -= ingredientToRemove[0].totalCarbohydrates;
    this.totalSugarsSum -= ingredientToRemove[0].totalSugars;
    this.addedSugarsSum -= ingredientToRemove[0].addedSugars;
    this.proteinsSum -= ingredientToRemove[0].proteins;
    this.totalFatSum -= ingredientToRemove[0].totalFat;
    this.saturatedFatSum -= ingredientToRemove[0].saturatedFat;
    this.transFatsSum -= ingredientToRemove[0].transFats;
    this.dietaryFiberSum -= ingredientToRemove[0].dietaryFiber;
    this.sodiumSum -= ingredientToRemove[0].sodium;

    this.recipesForm.patchValue({ totalPortion: this.totalPortionSum });
  }

  getIngredientData(ingredientId: string, portion?: any) {
    const ingredient = this.ingredients.filter((ingred: any) => ingred.id === ingredientId)[0];
    const data = {
      ...ingredient,
      totalPortion: portion,
      energeticValue: (ingredient.energeticValue * portion) / 100,
      totalCarbohydrates: (ingredient.totalCarbohydrates * portion) / 100,
      totalSugars: (ingredient.totalSugars * portion) / 100,
      addedSugars: (ingredient.addedSugars * portion) / 100,
      proteins: (ingredient.proteins * portion) / 100,
      totalFat: (ingredient.totalFat * portion) / 100,
      saturatedFat: (ingredient.saturatedFat * portion) / 100,
      transFats: (ingredient.transFats * portion) / 100,
      dietaryFiber: (ingredient.dietaryFiber * portion) / 100,
      sodium: (ingredient.sodium * portion) / 100,
    }
    return data || null;
  }

  getMacroSum(ingredients: any[]) {
    const sum = {
      energeticValueSum: 0,
      totalCarbohydratesSum: 0,
      totalSugarsSum: 0,
      addedSugarsSum: 0,
      proteinsSum: 0,
      totalFatSum: 0,
      saturatedFatSum: 0,
      transFatsSum: 0,
      dietaryFiberSum: 0,
      sodiumSum: 0,
    };

    ingredients.forEach((ingred: any) => {
      sum.energeticValueSum += ingred.energeticValue;
      sum.totalCarbohydratesSum += ingred.totalCarbohydrates;
      sum.totalSugarsSum += ingred.totalSugars;
      sum.addedSugarsSum += ingred.addedSugars;
      sum.proteinsSum += ingred.proteins;
      sum.totalFatSum += ingred.totalFat;
      sum.saturatedFatSum += ingred.saturatedFat;
      sum.transFatsSum += ingred.transFats;
      sum.dietaryFiberSum += ingred.dietaryFiber;
      sum.sodiumSum += ingred.sodium;
    });

    return sum;
  }

  // recipe?: RecipeModal
  openDialog(dialog: TemplateRef<any>, recipe?: any) {
    this.dialogSrvc.open(dialog);

    if (recipe) {
      this.editing = true;
      this.choosedIngredients = recipe.ingredients;
      this.choosedRecipe = recipe;
      this.checkedRestrictions = recipe.restrictions;
      this.checkedUsed = recipe.usedIn;

      const sum = this.getMacroSum(this.choosedIngredients);
      this.energeticValueSum = sum.energeticValueSum;
      this.totalCarbohydratesSum = sum.totalCarbohydratesSum;
      this.totalSugarsSum = sum.totalSugarsSum;
      this.addedSugarsSum = sum.addedSugarsSum;
      this.proteinsSum = sum.proteinsSum;
      this.totalFatSum = sum.totalFatSum;
      this.saturatedFatSum = sum.saturatedFatSum;
      this.transFatsSum = sum.transFatsSum;
      this.dietaryFiberSum = sum.dietaryFiberSum;
      this.sodiumSum = sum.sodiumSum;

      this.recipesForm.patchValue(recipe);
    }

    else {
      this.resetSum();
      this.recipesForm.reset();
      this.editing = false;
      this.choosedRecipe = null;
      this.addedIngredient = null;
      this.checkedRestrictions = [];
      this.checkedUsed = ['breakfast', 'morning-snack', 'lunch', 'snack', 'dinner', 'supper'];
    }
  }

  isChecked(value: string, type?: string): boolean {
    let array: any[] = [];
    if (this.editing) {
      array = type === 'restriction' ? this.choosedRecipe?.restrictions : this.choosedRecipe?.usedIn;
    }
    else if (this.choosedIngredients.length > 0) {
      if (type === 'restriction') {
        // array = this.addedIngredient?.restrictions;
        // this.checkedRestrictions = array;
        array = this.checkedRestrictions;
      }
      else {
        array = this.addedIngredient?.usedIn;
        this.checkedUsed = array;
      }
    }
    return array?.includes(value) || false;
  }

  checkRestriction(checked: any, type: string) {
    const index = this.checkedRestrictions.indexOf(type);
    if (checked) {
      this.checkedRestrictions.push(type);
    }
    else {
      this.checkedRestrictions.splice(index, 1);
    }
  }

  checkUsedIn(checked: any, type: string) {
    const index = this.checkedUsed.indexOf(type);
    if (checked) {
      this.checkedUsed.push(type);
    }
    else {
      // this.checkedUsed = this.checkedUsed.filter(item => item !== type);
      this.checkedUsed.splice(index, 1);
    }
  }

  async deleteRecipe(recipeId: any) {
    try {
      await this.recipes.splice(this.recipes.findIndex((recipe: any) => recipe.id === recipeId), 1);
      await this.toastrSrvc.success(null, MSG_CONST.DELETED_RECIPE_OK, { icon: '' });
    } catch (e) {
      await this.toastrSrvc.danger(null, MSG_CONST.DELETED_RECIPE_ERROR, { icon: '' });
      console.error(e);
    }
  }

  async addOrUpdateRecipe() {
    try {
      const formData = this.recipesForm.value;
      formData.restrictions = this.checkedRestrictions;
      formData.usedIn = this.checkedUsed;

      if (!this.showMacros) {
        formData.ingredients = this.choosedIngredients;
        formData.energeticValue = this.energeticValueSum;
        formData.totalCarbohydrates = this.totalCarbohydratesSum;
        formData.totalSugars = this.totalSugarsSum;
        formData.addedSugars = this.addedSugarsSum;
        formData.proteins = this.proteinsSum;
        formData.totalFat = this.totalFatSum;
        formData.saturatedFat = this.saturatedFatSum;
        formData.transFats = this.transFatsSum;
        formData.dietaryFiber = this.dietaryFiberSum;
        formData.sodium = this.sodiumSum;
      }

      // await this.recipesSrvc.addOrUpdateDocument(formData);
      await this.toastrSrvc.success(null, MSG_CONST.SAVE_DATA_OK, { icon: '' });
      await this.getRecipes();
    } catch (e) {
      await this.toastrSrvc.danger(null, MSG_CONST.SAVE_DATA_ERROR, { icon: '' });
      console.error(e);
    }
  }

  getDocumentModel() {
    const data = [{ 'Título': '', 'Passo-a-Passo': '', 'ID dos Ingredientes': '', 'Qtd. Porção Ingredientes': '', 'Qtd. Porção Receita': '', 'Restrições': '', 'Usado em': '' }];
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Modelo-Receita.xlsx');
  }

  exportFile() {
    let data: any[] = [];
    let recipeIngredientsId: any = [];
    let recipeIngredientsPortion: any = [];

    this.recipes.forEach((recipe: any) => {
      recipeIngredientsId = recipe.ingredients.map((ingred: any) => ingred.id);
      recipeIngredientsPortion = recipe.ingredients.map((ingred: any) => ingred.totalPortion);
      const ingredientsId = recipeIngredientsId.join(', ');
      const ingredientsPortion = recipeIngredientsPortion.join(', ');

      data.push({
        'Título': recipe.title, 'Passo-a-Passo': recipe.description, 'ID dos Ingredientes': ingredientsId,
        'Qtd. Porção Ingredientes': ingredientsPortion, 'Qtd. Porção Receita': recipe.totalPortion,
        'Valor energético': recipe.energeticValue, 'Carboidratos totais': recipe.totalCarbohydrates,
        'Açúcares totais': recipe.totalSugars, 'Açúcares adicionados': recipe.addedSugars, 'Proteínas': recipe.proteins,
        'Gorduras totais': recipe.totalFat, 'Gorduras saturadas': recipe.saturatedFat, 'Gorduras trans': recipe.transFats,
        'Fibra alimentar': recipe.dietaryFiber, 'Sódio': recipe.sodium,
        'Restrições': recipe.restrictions.join(', '), 'Usado em': recipe.usedIn.join(', ')
      });
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Receitas.xlsx');
  }

  // IMPORTING DATA

  openImportDialog(dialog: TemplateRef<any>) {
    this.resetSum();
    this.importedData = [];
    this.importedForm.reset();
    this.dialogSrvc.open(dialog);
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
    try {
      let array: any[] = [];
      this.loading = true;
      const formData = this.importedForm.value;
      let newArray = this.importedData.map((item) => {
        const newItem: any = {};
        Object.keys(formData).forEach((colunaIngles) => {
          const colunaPortugues = formData[colunaIngles];
          let value = item[colunaPortugues] || null;
          newItem[colunaIngles] = value;
        });
        return newItem;
      });

      newArray.forEach((item) => {
        const ingredientsArray = item.ingredients?.replace(/,+$/, '').split(',').map((value: any) => (value.trim())) || [];
        const portionsArray = item.ingredientPortions?.replace(/,+$/, '').split(',').map((value: any) => parseFloat(value.trim()));
        const usagesArray = item.usedIn?.replace(/,+$/, '').split(',').map((value: any) => (value.trim())) || [];

        item.ingredients = ingredientsArray.map((id: any, index: string) => this.getIngredientData(id, portionsArray[index]));
        item.ingredients.map((ingred: any) => {
          this.energeticValueSum += ingred.energeticValue;
          this.totalCarbohydratesSum += ingred.totalCarbohydrates;
          this.totalSugarsSum += ingred.totalSugars;
          this.addedSugarsSum += ingred.addedSugars;
          this.proteinsSum += ingred.proteins;
          this.totalFatSum += ingred.totalFat;
          this.saturatedFatSum += ingred.saturatedFat;
          this.transFatsSum += ingred.transFats;
          this.dietaryFiberSum += ingred.dietaryFiber;
          this.sodiumSum += ingred.sodium

          ingred.restrictions.map((newRestriction: any) => {
            if (!this.checkedRestrictions.includes(newRestriction)) {
              this.checkedRestrictions.push(newRestriction);
            }
          });
          array = this.checkedRestrictions;
        });

        item.totalPortion = item.totalPortion ? item.totalPortion : portionsArray.reduce((a: any, b: any) => a + b, 0);
        item.energeticValue = this.energeticValueSum;
        item.totalCarbohydrates = this.totalCarbohydratesSum;
        item.totalSugars = this.totalSugarsSum;
        item.addedSugars = this.addedSugarsSum;
        item.proteins = this.proteinsSum;
        item.totalFat = this.totalFatSum;
        item.saturatedFat = this.saturatedFatSum;
        item.transFats = this.transFatsSum;
        item.dietaryFiber = this.dietaryFiberSum;
        item.sodium = this.sodiumSum;
        item.restrictions = array;
        item.usedIn = usagesArray.length > 0 ? usagesArray : ['breakfast', 'morning-snack', 'lunch', 'snack', 'dinner', 'supper'];
        // this.recipesSrvc.addOrUpdateDocument(item);
        this.resetSum();
      });

      setTimeout(() => this.loading = false, 3000);
      await this.toastrSrvc.success(null, + newArray.length + MSG_CONST.IMPORT_DATA_OK, { icon: '' });
      await this.getRecipes();
    } catch (e) {
      await this.toastrSrvc.danger(null, MSG_CONST.IMPORT_DATA_ERROR, { icon: '' });
      console.error(e);
    }
  }

  resetSum() {
    this.totalPortionSum = 0;
    this.energeticValueSum = 0;
    this.totalCarbohydratesSum = 0;
    this.totalSugarsSum = 0;
    this.addedSugarsSum = 0;
    this.proteinsSum = 0;
    this.totalFatSum = 0;
    this.saturatedFatSum = 0;
    this.transFatsSum = 0;
    this.dietaryFiberSum = 0;
    this.sodiumSum = 0;
    this.checkedRestrictions = [];
  }

}