import { Component, Injector, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MSG_CONST } from 'src/app/constants/message.const';
import { PARTNERS } from 'src/app/constants/mock.const';
import { PartnersModel } from 'src/app/models/partner-model';
import { BasePage } from 'src/app/services/base-page.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent extends BasePage implements OnInit {

  public editing: boolean = false;
  public partnersForm!: FormGroup;
  public partners: any;
  public choosedPartner: PartnersModel | null = null;
  columns = ['Criado em', 'Título', 'Cupom', 'Ações'];

  constructor(public injector: Injector) {
    super(injector);
  }

  async ngOnInit() {
    await this.createForms();
    await this.getPartners();
  }

  createForms() {
    this.partnersForm = this.fb.group({
      id: [],
      title: ['', Validators.required],
      coupon: ['', Validators.required],
    });
  }

  public async getPartners(): Promise<void> {
    try {
      this.partners = PARTNERS;
    } catch (e) {
      console.error(e);
    }
  }

  openDialog(dialog: TemplateRef<any>, partner?: PartnersModel) {
    this.editing = false;
    this.choosedPartner = null;
    this.dialogSrvc.open(dialog);
    this.partnersForm.reset();

    if (partner) {
      this.editing = true;
      this.choosedPartner = partner;
      this.partnersForm.patchValue(partner);
    }
  }

  openDeleteConfirmation(dialog: TemplateRef<any>) {
    this.dialogSrvc.open(dialog);
  }

  async deletePartner(partnerId: any) {
    try {
      this.partners = this.partners.filter((partner: any) => partner.id !== partnerId);
      await this.toastrSrvc.danger(null, MSG_CONST.DELETED_DATA_OK, { icon: '' });
    } catch (e) {
      await this.toastrSrvc.danger(MSG_CONST.VIEW_DATA_ERROR, MSG_CONST.ERROR_TITLE, { icon: '' });
      console.error(e);
    }
  }

  async addOrUpdatePartner() {
    // try {
    //   const formData = this.partnersForm.value;
    //   formData.registerDate = new Date();
    //   await this.partnersSrvc.addOrUpdateDocument(formData);
    //   await this.toastrSrvc.success(null, MSG_CONST.SAVE_DATA_OK, { icon: '' });
    //   await this.getPartners();
    //   this.partnersForm.reset();
    // } catch (e) {
    //   await this.toastrSrvc.danger(null, MSG_CONST.SAVE_DATA_ERROR, { icon: '' });
    //   console.error(e);
    // }
  }

}
