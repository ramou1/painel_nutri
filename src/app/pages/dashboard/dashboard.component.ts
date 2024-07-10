import { Component, Injector } from '@angular/core';
import { BasePage } from 'src/app/services/base-page.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent extends BasePage {

  public user: any;

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
  }
}
