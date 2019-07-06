import {Component, OnInit, Input} from '@angular/core';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Result} from '@core/net/Result.entity';
import {Role} from './role.entity';
import {SystemService} from '../system.service';

@Component({
    selector: 'app-role-modal',
    templateUrl: './roleModal.component.html'
})
export class RoleModalComponent implements OnInit {

    __role: Role;
    _type: string;
    roleForm: FormGroup;

    @Input()
    set role(role: Role) {
        this.__role = role;
    }

    @Input()
    set type(type: string) {
        this._type = type;
    }

    constructor(
        private subject: NzModalSubject,
        private message: NzMessageService,
        private formBuilder: FormBuilder,
        private service: SystemService
    ) { }

    ngOnInit() {
        this.roleForm = this.formBuilder.group({
            id: [this.__role.id],
            name: [this.__role.name, Validators.required],
            note: [this.__role.note]
        });
    }

    submit() {
        for (const i in this.roleForm.controls) {
            this.roleForm.controls[ i ].markAsDirty();
        }
        if (this.roleForm.valid) {
            const role = this.getSubmitData();
            if (this._type === 'add') {
                this.service.addRole(role).subscribe(
                    (data: Result) => {
                        if (data.code !== 0) {
                            this.message.error(data.msg);
                            return;
                        }
                        this.subject.next({back: true, data: data.data});
                        this.handleCancel(null);
                    });
            } else if (this._type === 'update') {
                this.service.updateRole(role).subscribe(
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

    getSubmitData(): Role {
        const res: Role = new Role();
        res.id = this.roleForm.controls.id.value;
        res.name = this.roleForm.controls.name.value;
        res.note = this.roleForm.controls.note.value;
        res.createTime = this.__role.createTime;
        return res;
    }

    handleCancel(e) {
        this.subject.destroy('onCancel');
    }
}
