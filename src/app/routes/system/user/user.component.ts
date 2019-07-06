import { Component, OnInit } from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {SystemService} from '../system.service';
import {Result} from '@core/net/Result.entity';
import {UserModalComponent} from './userModal.component';
import {User} from './user.entity';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {

    userList = [];

    constructor(
        private message: NzMessageService,
        private service: SystemService,
        private modalService: NzModalService
    ) { }

    ngOnInit() {
        this.service.loadUserList().subscribe((data: any) => {
            if (data.code !== 0) {
                this.message.error(data.msg);
                return;
            }
            this.userList = data.data;
        });
    }

    /**
     * 删除用户信息
     */
    delete(id: number) {
        this.service.deleteUser(id).subscribe((data: Result) => {
                if (data.code !== 0) {
                    this.message.error(data.msg);
                    return;
                }
                let length = this.userList.length;
                while (length--) {
                    if (this.userList[length].id === id) {
                        this.userList.splice(length, 1);
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
            title          : '新增用户',
            content        : UserModalComponent,
            footer         : false,
            componentParams: {
                user: new User(),
                type: 'add'
            }
        });

        subscription.subscribe(result => {
            if (result.back) {
                this.userList.push(result.data);
            }
        });
    }

    /**
     * 打开修改页面
     * @param {User} user
     */
    openUpdateModal(user: User) {
        const subscription = this.modalService.open({
            title          : '修改用户',
            content        : UserModalComponent,
            footer         : false,
            componentParams: {
                user: user,
                type: 'update'
            }
        });

        subscription.subscribe(result => {
            if (result.back) {
                this.userList.forEach((data, index) => {
                    if (data.id === result.data.id) {
                        this.userList[index] = result.data;
                    }
                });
            }
        });
    }

}
