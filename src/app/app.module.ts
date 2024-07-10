import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { IngredientsComponent } from './pages/ingredients/ingredients.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbIconModule, NbTagModule, NbMenuModule, NbSidebarService, NbDialogService, NbDialogModule, NbToastrModule, NbButtonModule, NbCardModule, NbInputModule, NbFormFieldModule, NbListModule, NbPopoverModule, NbTabsetModule, NbOptionModule, NbSelectModule, NbCheckboxModule, NbAutocompleteComponent, NbAutocompleteModule, NbSpinnerModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { environment } from 'src/environments/environment';
import { registerLocaleData } from '@angular/common';
import ptBr from "@angular/common/locales/pt";
import { RecipesComponent } from './pages/recipes/recipes.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { IngredientGroupsComponent } from './pages/ingredient-groups/ingredient-groups.component';
registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsersComponent,
    RecipesComponent,
    IngredientsComponent,
    PartnersComponent,
    PrivacyComponent,
    IngredientGroupsComponent,
  ],
  imports: [
    // AngularFireModule.initializeApp(environment),
    // AngularFirestoreModule.enablePersistence(),
    // provideFirebaseApp(() => initializeApp(environment)),
    // provideFirestore(() => getFirestore()),
    // provideStorage(() => getStorage()),
    // provideAuth(() => getAuth()),
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbMenuModule.forRoot(),
    NbToastrModule.forRoot(),
    NbDialogModule.forRoot(),
    NbAutocompleteModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbDialogModule,
    NbFormFieldModule,
    NbEvaIconsModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule,
    NbListModule,
    NbMenuModule,
    NbOptionModule,
    NbPopoverModule,
    NbSelectModule,
    NbSidebarModule,
    NbSpinnerModule,
    NbTabsetModule,
    NbTagModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    // HttpClientModule,
  ],
  providers: [
    NbSidebarService,
    NbDialogService,
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }


