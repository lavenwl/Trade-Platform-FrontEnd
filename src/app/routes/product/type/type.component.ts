import { Component, OnInit } from '@angular/core';
import {Type} from './type.entity';
import {ProductService} from '../product.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {TypeModalComponent} from 'app/routes/product/type/typeModal.component';
import {Result} from '@core/net/Result.entity';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
})
export class TypeComponent implements OnInit {

    typeList = []; // : Type[];

    constructor(
        private service: ProductService,
        private message: NzMessageService,
        private modalService: NzModalService
    ) { }

    ngOnInit() {
        this.service.loadTypeList().subscribe(
            (data: any) => {
                if (data.code !== 0) {
                    this.message.error(data.msg);
                    return;
                }
                this.typeList = data.data;
            });
    }

    /**
     * 删除产品信息
     */
    delete(id: number) {
        this.service.deleteType(id).subscribe((data: Result) => {
                if (data.code !== 0) {
                    this.message.error(data.msg);
                    return;
                }
                let length = this.typeList.length;
                while (length--) {
                    if (this.typeList[length].id === id) {
                        this.typeList.splice(length, 1);
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
            title          : '新增产品类型',
            content        : TypeModalComponent,
            footer         : false,
            componentParams: {
                product: new Type(),
                type: 'add'
            }
        });

        subscription.subscribe(result => {
            if (result.back) {
                this.typeList.push(result.data);
            }
        });
    }

    /**
     * 打开修改页面
     * @param {Product} product
     */
    openUpdateModal(type: Type) {
        const subscription = this.modalService.open({
            title          : '修改产品类型',
            content        : TypeModalComponent,
            footer         : false,
            componentParams: {
                product: type,
                type: 'update'
            }
        });

        subscription.subscribe(result => {
            if (result.back) {
                this.typeList.forEach((item, i) => {
                    if (item.id === result.data.id) {
                        this.typeList[i] = result.data;
                    }
                });
            }
        });
    }


}
