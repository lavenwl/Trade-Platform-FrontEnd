import { Component, OnInit } from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {SystemService} from '../system.service';
import {Company} from './company.entity';
import {CompanyModalComponent} from './companyModal.component';
import {Result} from '@core/net/Result.entity';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
})
export class CompanyComponent implements OnInit {

    companyList = [];

    constructor(
        private message: NzMessageService,
        private service: SystemService,
        private modalService: NzModalService
    ) { }

    ngOnInit() {
        this.service.loadCompanyList().subscribe((data: any) => {
            if (data.code !== 0) {
                this.message.error(data.msg);
                return;
            }
            this.companyList = data.data;
        });
    }

    /**
     * 删除公司信息
     */
    delete(id: number) {
        this.service.deleteCompany(id).subscribe((data: Result) => {
                if (data.code !== 0) {
                    this.message.error(data.msg);
                    return;
                }
                let length = this.companyList.length;
                while (length--) {
                    if (this.companyList[length].id === id) {
                        this.companyList.splice(length, 1);
                    }
                }
            }
        );

    }

    /**
     * 打开新增页面
     */
    openAddModal() {
        const subscription = this.modalService.open({
            title          : '新增公司',
            content        : CompanyModalComponent,
            footer         : false,
            componentParams: {
                company: new Company(),
                type: 'add'
            }
        });

        subscription.subscribe(result => {
            if (result.back) {
                this.companyList.push(result.data);
            }
        });
    }

    /**
     * 打开修改页面
     * @param {Product} product
     */
    openUpdateModal(company: Company) {
        const subscription = this.modalService.open({
            title          : '修改公司',
            content        : CompanyModalComponent,
            footer         : false,
            componentParams: {
                company: company,
                type: 'update'
            }
        });

        subscription.subscribe(result => {
            if (result.back) {
                this.companyList.forEach((data, index) => {
                    if (data.id === result.data.id) {
                        this.companyList[index] = result.data;
                    }
                });
            }
        });
    }

}
