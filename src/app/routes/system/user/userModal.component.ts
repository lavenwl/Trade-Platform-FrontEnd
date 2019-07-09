import {Component, OnInit, Input} from '@angular/core';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {User} from './user.entity';
import {SystemService} from '../system.service';
import {Result} from '@core/net/Result.entity';
import {Company} from '../company/company.entity';
import {Role} from 'app/routes/system/role/role.entity';

@Component({
    selector: 'app-user-modal',
    templateUrl: './userModal.component.html'
})
export class UserModalComponent implements OnInit {

    _user: User;
    roleList: Role[];
    companyList: Company[];
    _type: string;
    userForm: FormGroup;

    @Input()
    set user(user: User) {
        this._user = user;
    }

    get user() {
        return this._user;
    }

    @Input()
    set type(type: string) {
        this._type = type;
    }

    get type() {
        return this._type;
    }

    constructor(
        private message: NzMessageService,
        private subject: NzModalSubject,
        private formBuilder: FormBuilder,
        private service: SystemService
    ) { }

    ngOnInit() {

        this.userForm = this.formBuilder.group({
            id: [this._user.id],
            name: [this._user.name, Validators.required],
            password: [this._user.password, Validators.required],
            role: [this.getRoleValue(), Validators.required],
            company: [this._user.company.id, Validators.required],
            phone: [this._user.phone],
            note: [this._user.note]
        });

        /** 初始化角色列表信息 */
        this.service.loadRoleList().subscribe((data: Result) => {
            if (data.code !== 0) {
                this.message.error(data.msg);
                return;
            }
            this.roleList = data.data;
        });

        /** 初始化公司列表信息 */
        this.service.loadCompanyList().subscribe((data: Result) => {
            if (data.code !== 0) {
                this.message.error(data.msg);
                return;
            }
            this.companyList = data.data;
        });
    }

    submit() {
        for (const i in this.userForm.controls) {
            this.userForm.controls[ i ].markAsDirty();
        }
        if (this.userForm.valid) {
            const user = this.getSubmitData();
            if (this._type === 'add') {
                this.service.addUser(user).subscribe(
                    (data: Result) => {
                        if (data.code !== 0) {
                            this.message.error(data.msg);
                            return;
                        }
                        this.subject.next({back: true, data: data.data});
                        this.handleCancel(null);
                    });
            } else if (this._type === 'update') {
                this.service.updateUser(user).subscribe(
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

    getSubmitData(): User {
        const user = new User();
        user.id = this.userForm.controls.id.value;
        user.name = this.userForm.controls.name.value;
        user.phone = this.userForm.controls.phone.value;
        user.password = this.userForm.controls.password.value;
        const roles = this.userForm.controls.role.value;
        const roleList: Array<Role> = [];
        this.roleList.forEach(item => {
            console.log('过滤:', item, roles.find(i => i === item.id), roles.find(i => i === item.id) > 0);
            if (roles.find(i => i === item.id) > 0) {
                roleList.push(item);
            }
        });
        user.roleList = roleList;
        const companyId = this.userForm.controls.company.value;
        const company: Company = this.companyList.filter(item => (item.id === companyId))[0];
        user.company = company;
        user.note = this.userForm.controls.note.value;
        user.createTime = this._user.createTime;
        return user;
    }

    handleCancel(e) {
        this.subject.destroy('onCancel');
    }

    private getRoleValue() {
        let roleList = [];
        this.user.roleList.forEach(role => roleList.push(role.id));
        return roleList;
    }
}
