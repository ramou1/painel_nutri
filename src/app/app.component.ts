import { Component, Injector, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { BasePage } from './services/base-page.service';
import { NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
import { USERS } from './constants/mock.const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent extends BasePage implements OnInit {
  title = 'Painel Nutri';
  public activatedTab = false;
  public user: any;
  shortName: string = '';
  public production = environment.production;

  public menu: NbMenuItem[] = [
    {
      title: 'Início',
      icon: 'home-outline',
      link: '/dashboard',
      pathMatch: 'full',
    },
    {
      title: 'Grupos de Ingredientes',
      icon: 'layers-outline',
      link: '/ingredient-groups',
      pathMatch: 'full',
    },
    {
      title: 'Ingredientes',
      icon: 'clipboard-outline',
      link: '/ingredients',
      pathMatch: 'full',
      // badge: {
      //   text: '30',
      //   status: 'primary',
      // },
    },
    {
      title: 'Receitas',
      icon: 'book-open-outline',
      link: '/recipes',
      pathMatch: 'full',
    },
    {
      title: 'Parceiros',
      icon: 'people-outline',
      link: '/partners',
      pathMatch: 'full',
    },
    {
      title: 'Usuários',
      icon: 'person-add-outline',
      link: '/users',
      pathMatch: 'full',
    },
    {
      title: 'Privacidade e Termos',
      icon: 'lock-outline',
      link: '/privacy',
      pathMatch: 'full',
    },
  ];

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.getUserData();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let child = this.activatedRoute.firstChild;
        if (!child) {
          return;
        }
        while (child.firstChild) {
          child = child.firstChild;
        }
        if (child.snapshot.data) {
          this.activatedTab = child.snapshot.data['tab'];
        }
      }
    });
  }

  async getUserData() {
    const uid = '559VoD86YnMC2kzqfZ38zBUwcO22';
    if (uid) {
      this.user = USERS.find(user => user.uid === uid);
      this.shortName = this.user.name.split(' ')[0];
    }
  }

  async logout() {
    await this.router.navigate(['/login']);
  }

}
