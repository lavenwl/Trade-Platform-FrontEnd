import {MockRequest} from '@delon/mock';
import {Order} from '../src/app/routes/order/order.entity';
import {Result} from "@core/net/Result.entity";


//
// function getOrderList2(): any[] {
//     const dataSet = [];
//     for (let i = 0; i < 50; i++) {
//         dataSet.push({
//             id: i,
//             name: `产品名称 ${i}`,
//             type: {
//                 id: 1,
//                 name: '类型1'
//             },
//             spec: '150*${i}',
//             provider: '供应商',
//             factory: '厂家',
//             note: '备注',
//             enable: false,
//             updateTime: null,
//             createTime: null
//         });
//         return dataSet;
//     }

function getOrderList(): Result {
    return {
        'code': 0,
        'msg': '成功',
        'data': [
            {
                'id': 1,
                'type': 1,
                'purchaseCompany': {
                    'id': 6,
                    'name': '123',
                    'note': '123',
                    'enable': true,
                    'updateTime': 1520387452000,
                    'createTime': 1520387452000
                },
                'saleCompany': {
                    'id': 6,
                    'name': '123',
                    'note': '123',
                    'enable': true,
                    'updateTime': 1520387452000,
                    'createTime': 1520387452000
                },
                'money': 1,
                'description': '123',
                'enable': true,
                'updateTime': 1520387452000,
                'createTime': 1520387452000,
                'itemList': [
                    {
                        'id': 1,
                        'num': 1,
                        'product': {
                            'id': 7,
                            'name': '8888',
                            'type': {
                                'id': 6,
                                'name': '6',
                                'note': null,
                                'enable': true,
                                'updateTime': 1520075092000,
                                'createTime': 1520075092000
                            },
                            'spec': '8888gggggg',
                            'priceIn': 4,
                            'priceOut': 4.5,
                            'provider': '6',
                            'factory': '6',
                            'note': '6',
                            'enable': true,
                            'updateTime': 1520300181000,
                            'createTime': 1520300181000
                        },
                        'quantity': 1,
                        'price': 1,
                        'money': 1,
                        'description': '123',
                        'enable': true,
                        'updateTime': 1520387452000,
                        'createTime': 1520387452000
                    }
                ]
            }, {
                'id': 2,
                'type': 1,
                'purchaseCompany': {
                    'id': 6,
                    'name': '123',
                    'note': '123',
                    'enable': true,
                    'updateTime': 1520387452000,
                    'createTime': 1520387452000
                },
                'saleCompany': {
                    'id': 6,
                    'name': '123',
                    'note': '123',
                    'enable': true,
                    'updateTime': 1520387452000,
                    'createTime': 1520387452000
                },
                'money': 1,
                'description': '123',
                'enable': true,
                'updateTime': 1520387452000,
                'createTime': 1520387452000,
                'itemList': [
                    {
                        'id': 1,
                        'num': 1,
                        'product': {
                            'id': 7,
                            'name': '8888',
                            'type': {
                                'id': 6,
                                'name': '6',
                                'note': null,
                                'enable': true,
                                'updateTime': 1520075092000,
                                'createTime': 1520075092000
                            },
                            'spec': '8888gggggg',
                            'priceIn': 4,
                            'priceOut': 4.5,
                            'provider': '6',
                            'factory': '6',
                            'note': '6',
                            'enable': true,
                            'updateTime': 1520300181000,
                            'createTime': 1520300181000
                        },
                        'quantity': 1,
                        'price': 1,
                        'money': 1,
                        'description': '123',
                        'enable': true,
                        'updateTime': 1520387452000,
                        'createTime': 1520387452000
                    }
                ]
            }
            ]
    }
    ;
}

function addOrder(entity: Order): Result {
    entity.id = Math.random();
    return {
        'code': 0,
        'msg': '成功',
        'data': entity
    };
}

function updateOrder(entity: Order): Result {
    return {
        'code': 0,
        'msg': '成功',
        'data': entity
    };
}

function del (req: MockRequest) {
    return {'code': 0, 'msg': '成功', 'data': req.params };
}

export const ORDER = {
    'GET /server/order': () => getOrderList(),
    'POST /server/order': (req: MockRequest) => addOrder(req.body),
    'PUT /server/order': (req: MockRequest) => updateOrder(req.body),
    'DELETE /server/order/:id': (req: MockRequest) => del(req),

    'GET /server/saleOrder': () => getOrderList(),
    'POST /server/saleOrder': (req: MockRequest) => addOrder(req.body),
    'PUT /server/saleOrder': (req: MockRequest) => updateOrder(req.body),
    'DELETE /server/saleOrder/:id': (req: MockRequest) => del(req),

    'GET /server/purchaseOrder': () => getOrderList(),
    'POST /server/purchaseOrder': (req: MockRequest) => addOrder(req.body),
    'PUT /server/purchaseOrder': (req: MockRequest) => updateOrder(req.body),
    'DELETE /server/purchaseOrder/:id': (req: MockRequest) => del(req)
};

