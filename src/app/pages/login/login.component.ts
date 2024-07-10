import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MSG_CONST } from 'src/app/constants/message.const';
import { STORAGE } from 'src/app/constants/storage.const';
import { BasePage } from 'src/app/services/base-page.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BasePage implements OnInit {

  public loginForm!: FormGroup;
  public user: any;
  public production = environment.production;

  constructor(public injector: Injector) {
    super(injector);
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  ngOnInit(): void {
  }

  async login() {
    const formData = this.loginForm.value;

    if (!formData.email || !formData.password) {
      this.toastrSrvc.danger(MSG_CONST.EMPTY_FIELDS, MSG_CONST.ERROR_TITLE, { icon: '' });
    }
    else {
      this.router.navigate(['/dashboard']);
    }
  }

}
