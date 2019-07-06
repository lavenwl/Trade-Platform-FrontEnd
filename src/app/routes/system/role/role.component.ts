import { Component, OnInit } from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Result} from '@core/net/Result.entity';
import {SystemService} from '../system.service';
import {Role} from './role.entity';
import {RoleModalComponent} from './roleModal.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
})
export class RoleComponent implements OnInit {


    roleList = []; // : Role[];

    constructor(
        private service: SystemService,
        private message: NzMessageService,
        private modalService: NzModalService
    ) { }

    ngOnInit() {
        this.service.loadRoleList().subscribe(
            (data: any) => {
                if (data.code !== 0) {
                    this.message.error(data.msg);
                    return;
                }
                this.roleList = data.data;
            });
    }

    /**
     * 删除角色信息
     */
    delete(id: number) {
        this.service.deleteRole(id).subscribe((data: Result) => {
                if (data.code !== 0) {
                    this.message.error(data.msg);
                    return;
                }
                let length = this.roleList.length;
                while (length--) {
                    if (this.roleList[length].id === id) {
                        this.roleList.splice(length, 1);
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
            title          : '新增角色类型',
            content        : RoleModalComponent,
            footer         : false,
            componentParams: {
                role: new Role(),
                type: 'add'
            }
        });

        subscription.subscribe(result => {
            if (result.back) {
                this.roleList.push(result.data);
            }
        });
    }

    /**
     * 打开修改页面
     * @param {Role} role
     */
    openUpdateModal(role: Role) {
        const subscription = this.modalService.open({
            title          : '修改角色类型',
            content        : RoleModalComponent,
            footer         : false,
            componentParams: {
                role: role,
                type: 'update'
            }
        });

        subscription.subscribe(result => {
            if (result.back) {
                this.roleList.forEach((item, i) => {
                    if (item.id === result.data.id) {
                        this.roleList[i] = result.data;
                    }
                });
            }
        });
    }


}
