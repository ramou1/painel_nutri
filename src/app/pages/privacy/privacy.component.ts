import { Component } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { MSG_CONST } from 'src/app/constants/message.const';
import { PRIVACY, TERMS } from 'src/app/constants/mock.const';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent {
  privacy: any;
  terms: any;
  isEditing: boolean = false;

  constructor(private toastrSrvc: NbToastrService) { }

  async ngOnInit() {
    this.terms = await TERMS;
    this.privacy = await PRIVACY;
  }

  async save(data: any, type: string) {
    try {
      this.toastrSrvc.success(null, MSG_CONST.SAVE_DATA_OK, { icon: '' });
    } catch (e) {
      await this.toastrSrvc.danger(MSG_CONST.SAVE_DATA_ERROR, MSG_CONST.ERROR_TITLE, { icon: '' });
      console.error(e);
    }
  }
}
