import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Order} from '../order.entity';
import {OrderModalComponent} from '../orderModal.component';
import {Result} from '@core/net/Result.entity';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
})
export class SaleComponent implements OnInit {

    orderList = [];

    constructor(
        private message: NzMessageService,
        private service: OrderService,
        private modalService: NzModalService
    ) { }

    ngOnInit() {
        this.service.loadOrderList(0).subscribe((data: any) => {
            if (data.code !== 0) {
                this.message.error(data.msg);
                return;
            }
            data.data.forEach(item => {
                item.itemList = item.itemList.sort((a, b) => a.num > b.num);
            })
            this.orderList = data.data;
        });
    }

    /**
     * 删除订单信息
     */
    delete(id: number) {
        this.service.deleteOrder(id).subscribe((data: Result) => {
                if (data.code !== 0) {
                    this.message.error(data.msg);
                    return;
                }
                let length = this.orderList.length;
                while (length--) {
                    if (this.orderList[length].id === id) {
                        this.orderList.splice(length, 1);
                    }
                }
            }
        );

    }

    /**
     * 打开新增页面
     */
    openAddModal() {
        const order: Order = new Order();
        order.type = 0;
        order.orderId = this.service.createOrderId();
        const subscription = this.modalService.open({
            title          : '新增销售订单',
            width          : (window.innerWidth * 0.9),
            content        : OrderModalComponent,
            footer         : false,
            componentParams: {
                order: order,
                type: 'add'
            }
        });

        subscription.subscribe(result => {
            if (result.back) {
                this.orderList.push(result.data);
            }
        });
    }

    /**
     * 打开修改页面
     * @param {Order} order
     */
    openUpdateModal(order: Order) {
        const subscription = this.modalService.open({
            title          : '修改销售订单',
            width          : (window.innerWidth * 0.9),
            content        : OrderModalComponent,
            footer         : false,
            componentParams: {
                order: order,
                type: 'update'
            }
        });

        subscription.subscribe(result => {
            if (result.back) {
                this.orderList.forEach((data, index) => {
                    if (data.id === result.data.id) {
                        this.orderList[index] = result.data;
                    }
                });
            }
        });
    }

}
