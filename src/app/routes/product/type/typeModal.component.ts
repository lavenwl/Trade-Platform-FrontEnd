import {Component, OnInit, Input} from '@angular/core';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ProductService} from '../product.service';
import {Type} from './type.entity';
import {Result} from '@core/net/Result.entity';

@Component({
    selector: 'app-type-modal',
    templateUrl: './typeModal.component.html'
})
export class TypeModalComponent implements OnInit {

    __type: Type;
    _type: string;
    typeForm: FormGroup;

    @Input()
    set product(type: Type) {
        this.__type = type;
    }

    @Input()
    set type(type: string) {
        this._type = type;
    }

    constructor(
        private subject: NzModalSubject,
        private message: NzMessageService,
        private formBuilder: FormBuilder,
        private service: ProductService
    ) { }

    ngOnInit() {
        this.typeForm = this.formBuilder.group({
            id: [this.__type.id],
            name: [this.__type.name, Validators.required],
            note: [this.__type.note]
        });
    }

    submit() {
        for (const i in this.typeForm.controls) {
            this.typeForm.controls[ i ].markAsDirty();
        }
        if (this.typeForm.valid) {
            const type = this.getSubmitData();
            if (this._type === 'add') {
                this.service.addType(type).subscribe(
                    (data: Result) => {
                        if (data.code !== 0) {
                            this.message.error(data.msg);
                            return;
                        }
                        this.subject.next({back: true, data: data.data});
                        this.handleCancel(null);
                    });
            } else if (this._type === 'update') {
                this.service.updateType(type).subscribe(
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

    getSubmitData(): Type {
        const res: Type = new Type();
        res.id = this.typeForm.controls.id.value;
        res.name = this.typeForm.controls.name.value;
        res.note = this.typeForm.controls.note.value;
        res.createTime = this.__type.createTime;
        return res;
    }

    handleCancel(e) {
        this.subject.destroy('onCancel');
    }
}
