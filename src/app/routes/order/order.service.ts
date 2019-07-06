import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order} from './order.entity';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable()
export class OrderService {
    constructor(
        private message: NzMessageService,
        private http: HttpClient
    ) { }

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
