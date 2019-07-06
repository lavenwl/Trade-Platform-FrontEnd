import { Component, OnInit, AfterViewInit } from '@angular/core';
import {ProductService} from '../product.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {ProductModalComponent} from './productModal.component';
import {Product} from './product.entity';
import {Result} from '@core/net/Result.entity';
import {ReuseTabService} from '@delon/abc';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit, AfterViewInit {

    productList = []; // Product[];
    searchValue = '';
    copyData = [];

    constructor(
        private message: NzMessageService,
        private reuseTabService: ReuseTabService,
        private service: ProductService,
        private modalService: NzModalService
    ) { }

    ngOnInit() {
        this.service.loadProductList().subscribe((data: any) => {
            if (data.code !== 0) {
                this.message.error(data.msg);
                return;
            }
            this.productList = data.data;
            this.copyData = [ ...this.productList ];
        });


    }

    /** 激活页面时更新页面数据 */
    _onReuseInit() {
        this.service.loadProductList().subscribe((data: any) => {
            if (data.code !== 0) {
                this.message.error(data.msg);
                return;
            }
            this.productList = data.data;
            this.copyData = [ ...this.productList ];
        });
    }

    ngAfterViewInit() {
        console.log('product page init');
    }

    search() {
        this.productList = [ ...this.copyData.filter(item => {
            return (item.name.indexOf(this.searchValue) !== -1);
            // return (item.name.indexOf(this.searchValue) !== -1
            //     || (item.provider ? false : (item.provider.indexOf(this.searchValue) !== -1))
            //     || (item.factory ? false : (item.factory.indexOf(this.searchValue) !== -1))
            //     || (item.note ? false : (item.note.indexOf(this.searchValue) !== -1)));
        }) ];
    }

    /**
     * 删除产品信息
     */
    delete(id: number) {
        this.service.deleteProduct(id).subscribe((data: Result) => {
            if (data.code !== 0) {
                this.message.error(data.msg);
                return;
            }
            let length = this.productList.length;
            while (length--) {
                if (this.productList[length].id === id) {
                    this.productList.splice(length, 1);
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
            title          : '新增产品',
            content        : ProductModalComponent,
            footer         : false,
            componentParams: {
                product: new Product(),
                type: 'add'
            }
        });

        subscription.subscribe(result => {
            if (result.back) {
                this.productList.push(result.data);
            }
        });
    }

    /**
     * 打开修改页面
     * @param {Product} product
     */
    openUpdateModal(product: Product) {
        const subscription = this.modalService.open({
            title          : '修改产品',
            content        : ProductModalComponent,
            footer         : false,
            componentParams: {
                product: product,
                type: 'update'
            }
        });

        subscription.subscribe(result => {
            if (result.back) {
                this.productList.forEach((data, index) => {
                    if (data.id === result.data.id) {
                        this.productList[index] = result.data;
                    }
                });
            }
        });
    }

}
