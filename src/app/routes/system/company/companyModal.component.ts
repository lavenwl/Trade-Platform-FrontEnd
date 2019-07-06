import {Component, OnInit, Input} from '@angular/core';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Company} from './company.entity';
import {SystemService} from '../system.service';
import {Result} from '@core/net/Result.entity';

@Component({
    selector: 'app-company-modal',
    templateUrl: './companyModal.component.html'
})
export class CompanyModalComponent implements OnInit {

    _company: Company;
    _type: string;
    companyForm: FormGroup;

    @Input()
    set company(company: Company) {
        this._company = company;
    }

    @Input()
    set type(type: string) {
        this._type = type;
    }

    constructor(
        private message: NzMessageService,
        private subject: NzModalSubject,
        private formBuilder: FormBuilder,
        private service: SystemService
    ) { }

    ngOnInit() {
        this.companyForm = this.formBuilder.group({
            id: [this._company.id],
            name: [this._company.name, Validators.required],
            phone: [this._company.phone],
            address: [this._company.address],
            note: [this._company.note]
        });
    }

    submit() {
        for (const i in this.companyForm.controls) {
            this.companyForm.controls[ i ].markAsDirty();
        }
        if (this.companyForm.valid) {
            const company = this.getSubmitData();
            if (this._type === 'add') {
                this.service.addCompany(company).subscribe(
                    (data: Result) => {
                        if (data.code !== 0) {
                            this.message.error(data.msg);
                            return;
                        }
                        this.subject.next({back: true, data: data.data});
                        this.handleCancel(null);
                    });
            } else if (this._type === 'update') {
                this.service.updateCompany(company).subscribe(
                    (data: Result) => {
                        if (data.code !== 0) {
                            this.message.error(data.msg);
                            return;
                        }
                        this.subject.next({back: true, data: data.data});
                        this.handleCancel(null);
                    });
            }

        }

    }

    getSubmitData(): Company {
        const company = new Company();
        company.id = this.companyForm.controls.id.value;
        company.name = this.companyForm.controls.name.value;
        company.phone = this.companyForm.controls.phone.value;
        company.address = this.companyForm.controls.address.value;
        company.note = this.companyForm.controls.note.value;
        company.createTime = this._company.createTime;
        return company;
    }

    handleCancel(e) {
        this.subject.destroy('onCancel');
    }
}
