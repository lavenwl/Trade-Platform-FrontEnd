import {Component, OnInit, Input} from '@angular/core';
import {Product} from './product.entity';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ProductService} from '../product.service';
import {Type} from '../type/type.entity';
import {Result} from '@core/net/Result.entity';

@Component({
    selector: 'app-product-modal',
    templateUrl: './productModal.component.html'
})
export class ProductModalComponent implements OnInit {

    _product: Product;
    _typeList: Type[];
    _type: string;
    productForm: FormGroup;


    @Input()
    set product(product: Product) {
        this._product = product;
    }

    @Input()
    set type(type: string) {
        this._type = type;
    }

    constructor(
        private message: NzMessageService,
        private subject: NzModalSubject,
        private formBuilder: FormBuilder,
        private service: ProductService
    ) { }

    ngOnInit() {
        this.productForm = this.formBuilder.group({
            id: [this._product.id],
            name: [this._product.name, Validators.required],
            type: [this._product.type.id, Validators.required],
            spec: [this._product.spec, Validators.required],
            priceIn: [this._product.priceIn, Validators.required],
            priceOut: [this._product.priceOut, Validators.required],
            provider: [this._product.provider],
            factory: [this._product.factory],
            note: [this._product.note]
        });
        this.service.loadTypeList().subscribe((data: Result) => {
            if (data.code !== 0) {
                this.message.error(data.msg);
                return;
            }
            this._typeList = data.data;
        });
    }

    get name() {
        return this.productForm.controls['name'];
    }
    get formType() {
        return this.productForm.controls['type'];
    }
    get spec() {
        return this.productForm.controls['spec'];
    }
    get priceIn() {
        return this.productForm.controls['priceIn'];
    }
    get priceOut() {
        return this.productForm.controls['priceOut'];
    }
    get provider() {
        return this.productForm.controls['provider'];
    }
    get factory() {
        return this.productForm.controls['factory'];
    }
    get note() {
        return this.productForm.controls['note'];
    }

    submit() {
        for (const i in this.productForm.controls) {
            this.productForm.controls[ i ].markAsDirty();
        }
        if (this.productForm.valid) {
            const product = this.getSubmitData();
            if (this._type === 'add') {
                this.service.addProduct(product).subscribe(
                    (data: Result) => {
                        if (data.code !== 0) {
                            this.message.error(data.msg);
                            return;
                        }
                        this.subject.next({back: true, data: data.data});
                        this.handleCancel(null);
                    });
            } else if (this._type === 'update') {
                this.service.updateProduct(product).subscribe(
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

    getSubmitData(): Product {
        const product = new Product();
        // product.id = this.productForm.controls.id.value;
        // product.name = this.productForm.controls.name.value;
        // product.spec = this.productForm.controls.spec.value;
        // product.priceIn = this.productForm.controls.priceIn.value;
        // product.priceOut = this.productForm.controls.priceOut.value;
        // product.provider = this.productForm.controls.provider.value;
        // product.factory = this.productForm.controls.factory.value;
        // product.note = this.productForm.controls.note.value;
        const typeId = this.formType.value;
        Object.assign(product, this.productForm.value);
        const type: Type = this._typeList.filter(item => (item.id === typeId))[0];
        product.type = type;
        product.createTime = this._product.createTime;
        return product;
    }

    handleCancel(e) {
        this.subject.destroy('onCancel');
    }
}
