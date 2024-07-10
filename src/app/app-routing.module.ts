import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { APP_ROUTES } from './constants/routes.const';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IngredientsComponent } from './pages/ingredients/ingredients.component';
import { UsersComponent } from './pages/users/users.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { IngredientGroupsComponent } from './pages/ingredient-groups/ingredient-groups.component';

const routes: Routes = [
  {
    path: APP_ROUTES.LOGIN,
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: APP_ROUTES.DASHBOARD,
    data: { title: APP_ROUTES.DASHBOARD, tab: true },
    component: DashboardComponent,
  },
  {
    path: APP_ROUTES.INGREDIENT_GROUPS,
    data: { title: APP_ROUTES.INGREDIENT_GROUPS, tab: true },
    component: IngredientGroupsComponent,
  },
  {
    path: APP_ROUTES.INGREDIENTS,
    data: { title: APP_ROUTES.INGREDIENTS, tab: true },
    component: IngredientsComponent,
  },
  {
    path: APP_ROUTES.RECIPES,
    data: { title: APP_ROUTES.RECIPES, tab: true },
    component: RecipesComponent,
  },
  {
    path: APP_ROUTES.PARTNERS,
    data: { title: APP_ROUTES.PARTNERS, tab: true },
    component: PartnersComponent,
  },
  {
    path: APP_ROUTES.PRIVACY,
    data: { title: APP_ROUTES.PRIVACY, tab: true },
    component: PrivacyComponent,
  },
  {
    path: APP_ROUTES.USERS,
    data: { title: APP_ROUTES.USERS, tab: true },
    component: UsersComponent,
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
