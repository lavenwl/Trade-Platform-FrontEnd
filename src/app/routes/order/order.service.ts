import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order} from './order.entity';
import {NzMessageService} from 'ng-zorro-antd';
import {DatePipe} from "@angular/common";

@Injectable()
export class OrderService {
    constructor(
        private message: NzMessageService,
        private http: HttpClient,
        private datePipe: DatePipe
    ) { }

    createOrderId() {
        const date = new Date();
        const year = date.getFullYear().toString();
        let month = date.getMonth().toString();
        month = month.length === 1 ? '0' + month : month;
        let day = date.getDay().toString();
        day = day.length === 1 ? '0' + day : day;
        let hours = date.getHours().toString();
        hours = hours.length === 1 ? '0' + hours : hours;
        let minutes = date.getMinutes().toString();
        minutes = minutes.length === 1 ? '0' + minutes : minutes;
        let seconds = date.getSeconds().toString();
        seconds = seconds.length === 1 ? '0' + seconds : seconds;

        return year + month + day + hours + minutes + seconds;
    }
    /**
     * 获取公司列表
     * @returns {Observable<Object>}
     */
    loadOrderList(type: number) {
        if (type === 1) {
            return this.http.get('/server/purchaseOrder');
        }else if (type === 0) {
            return this.http.get('/server/saleOrder');
        } else {
            this.message.error('获取订单列表参数错误');
        }

    }

    /**
     * 新增公司
     * @param {Order} entity
     * @returns {Observable<Object>}
     */
    addOrder(entity: Order) {
        return this.http.post('/server/order', entity);
    }

    /**
     * 修改公司
     * @param {Order} order
     * @returns {Observable<Object>}
     */
    updateOrder(entity: Order) {
        return this.http.put('/server/order', entity);
    }

    /**
     * 删除公司
     * @param {number} id
     * @returns {Observable<Object>}
     */
    deleteOrder(id: number) {
        return this.http.delete('/server/order/' + id );
    }
}
