import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import {LoginComponent} from "./login.component";
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbTagModule
} from "@nebular/theme";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    NbFormFieldModule,
    NbLayoutModule,
    NbCardModule,
    ReactiveFormsModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbTagModule
  ]
})
export class LoginModule { }
