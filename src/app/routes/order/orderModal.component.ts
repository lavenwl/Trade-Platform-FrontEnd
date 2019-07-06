import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import {Order} from './order.entity';
import {OrderService} from './order.service';
import {Company} from '../system/company/company.entity';
import {SystemService} from '../system/system.service';
import {Product} from '../product/product/product.entity';
import {ProductService} from '../product/product.service';
import {Result} from '@core/net/Result.entity';
import {EssenceNg2PrintComponent} from 'essence-ng2-print';

@Component({
    selector: 'app-order-modal',
    templateUrl: './orderModal.component.html'
})
export class OrderModalComponent implements OnInit {
    _order: Order;
    _type: string;
    orderForm: FormGroup;
    companyList: Company[];
    productList: Product[];

    editIndex = -1;
    editObj = {};

    get now() {
        return new Date();
    }

    @ViewChild('printComponent') printComponent: EssenceNg2PrintComponent;

    @Input()
    set order(order: Order) {
        this._order = order;
    }

    @Input()
    set type(type: string) {
        this._type = type;
    }

    constructor(
        private message: NzMessageService,
        private subject: NzModalSubject,
        private formBuilder: FormBuilder,
        private service: OrderService,
        private systemService: SystemService,
        private productService: ProductService
    ) { }

    ngOnInit() {
        this.orderForm = this.formBuilder.group({
            id: [this._order.id],
            type: [this._order.type, Validators.required],
            purchaseCompany: [this._order.purchaseCompany.id, Validators.required],
            saleCompany: [this._order.saleCompany.id, Validators.required],
            description: [this._order.description],
            money: [this._order.money, Validators.required],
            items: this.formBuilder.array([])
        });
        this.systemService.loadCompanyList().subscribe((data: Result) => {
            if (data.code !== 0) {
                this.message.error(data.msg);
                return;
            }
            this.companyList = data.data;
        });
        this.productService.loadProductList().subscribe((data: Result) => {
            if (data.code !== 0) {
                this.message.error(data.msg);
                return;
            }
            this.productList = data.data;
        });

        if (this._order.itemList) {
            // 初始化表单
            this._order.itemList.forEach(i => {
                const field = this.createItem();
                field.patchValue(i);
                this.items.push(field);
            });
        }

    }

    // get type() {
    //     return this.orderForm.controls.type;
    // }
    get purchaseCompany() {
        return this.orderForm.controls.purchaseCompany;
    }
    get saleCompany() {
        return this.orderForm.controls.saleCompany;
    }
    get description() {
        return this.orderForm.controls.description;
    }
    get money() {
        return this.orderForm.controls.money;
    }

    get items() { return this.orderForm.controls.items as FormArray; }

    submit() {
        for (const i in this.orderForm.controls) {
            this.orderForm.controls[ i ].markAsDirty();
        }
        if (this.orderForm.valid) {
            const order = this.getSubmitData();
            if (this._type === 'add') {
                this.service.addOrder(order).subscribe(
                    (data: Result) => {
                        if (data.code !== 0) {
                            this.message.error(data.msg);
                            return;
                        }
                        this.subject.next({back: true, data: data.data});
                        this.handleCancel(null);
                    });
            } else if (this._type === 'update') {
                this.service.updateOrder(order).subscribe(
                    (data: Result) => {
                        if (data.code !== 0) {
                            this.message.error(data.msg);
                            return;
                        }
                        this.subject.next({back: true, data: data.data});
                        this.handleCancel(null);
                    });
            }
        } else {
            this.message.create('error', '表单填写有误');
        }

    }

    getSubmitData(): Order {
        const order = new Order();
        order.id = this.orderForm.controls.id.value;
        order.type = this.orderForm.controls.type.value;
        const saleCompanyId = this.orderForm.controls.saleCompany.value;
        const saleCompany = this.companyList.filter((item) => item.id === saleCompanyId)[0];
        order.saleCompany = saleCompany;
        const purchaseCompanyId = this.orderForm.controls.purchaseCompany.value;
        const purchaseCompany = this.companyList.filter((item) => item.id === purchaseCompanyId)[0];
        order.purchaseCompany = purchaseCompany;
        order.money = this.orderForm.controls.money.value;
        order.description = this.orderForm.controls.description.value;
        // const itemList = this.items.value;
        // itemList.forEach(item => {
        //    item.product = this.productList.filter(product => product.id === item.productId)[0];
        // });
        order.itemList = this.items.value;
        order.createTime = this._order.createTime;
        return order;
    }

    createItem(): FormGroup {
        const num = this.items.length + 1;
        return this.formBuilder.group({
            id: [ null ],
            num: [ num, [ Validators.required ]],
            productId: [ null, [ Validators.required ] ],
            quantity: [ null, [ Validators.required ] ],
            price: [ null, [ Validators.required ] ],
            money: [ null, [ Validators.required ] ],
            description: [ null ],
            createTime: [null],
            updateTime: [null]
        });
    }

    add() {
        this.items.push(this.createItem());
        this.edit(this.items.length - 1);
    }

    del(index: number) {
        this.items.removeAt(index);
    }

    edit(index: number) {
        if (this.editIndex !== -1 && this.editObj) {
            this.items.at(this.editIndex).patchValue(this.editObj);
        }
        this.editObj = { ...this.items.at(index).value };
        this.editIndex = index;
    }

    save(index: number) {
        this.calculate2();
        this.items.at(index).markAsDirty();
        if (this.items.at(index).invalid) {
            this.message.create('error', '表单填写有误');
            return;
        }
        this.editIndex = -1;
    }

    cancel(index: number) {
        if (!this.items.at(index).value.key) {
            this.del(index);
        } else {
            this.items.at(index).patchValue(this.editObj);
        }
        this.editIndex = -1;
    }

    getProductName(index: number) {
        if (!this.productList || !index) return;
        return this.productList.filter(product => product.id === index)[0].name;
    }

    getProductSpec(index: number) {
        if (!this.productList || !index) return;
        return this.productList.filter(product => product.id === index)[0].spec;
    }

    calculate(itemForm: FormGroup) {
        const product = this.productList.filter(data => data.id === itemForm.controls.productId.value)[0];
        if (product) {
            let price = 0;
            if (this._order.type === 1) {
                price = product.priceIn;
            } else {
                price = product.priceOut;
            }
            if (!itemForm.controls.price.value || itemForm.controls.price.value === 0) {
                itemForm.controls.price.setValue(price);
                itemForm.controls.money.setValue(price * itemForm.controls.quantity.value);
            } else {
                itemForm.controls.money.setValue(itemForm.controls.price.value * itemForm.controls.quantity.value);
            }

        }

        let orderMoney = 0;
        this.items.value.forEach( item => {
            orderMoney = orderMoney + Number(item.money);
        });
        this.orderForm.controls.money.setValue(orderMoney);
    }

    calculate2() {
        let orderMoney = 0;
        this.items.value.forEach( item => {
            orderMoney = orderMoney + Number(item.money);
        });
        this.orderForm.controls.money.setValue(orderMoney);
    }

    handleCancel(e) {
        this.subject.destroy('onCancel');
    }

    print() {
        console.log('click print');
        this.printComponent.print();
    }

    getSaleCompany() {
        return this.companyList ? this.companyList.find(i => i.id === this.saleCompany.value).name : '';
    }

    getPurchaseCompany() {
        return this.companyList ? this.companyList.find(i => i.id === this.purchaseCompany.value).name : '';
    }
}