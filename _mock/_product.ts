import {MockRequest} from '@delon/mock';
import {Product} from '../src/app/routes/product/product/product.entity';
import {Type} from '../src/app/routes/product/type/type.entity';
import {Result} from "@core/net/Result.entity";

//
// function getProductList2(): any[] {
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

function getProductList(): Result {
    return {
        'code': 0,
        'msg': '成功',
        'data': [
            {
                'id': 7,
                'name': '产品1',
                'type': {
                    'id': 6,
                    'name': '6',
                    'note': null,
                    'enable': true,
                    'updateTime': 1520075092000,
                    'createTime': 1520075092000
                },
                'spec': '规格1',
                'priceIn': 4,
                'priceOut': 4.5,
                'provider': '6',
                'factory': '6',
                'note': '6',
                'enable': false,
                'updateTime': 1520075031000,
                'createTime': 1519558615000
            },
            {
                'id': 17,
                'name': '产品3',
                'type': {
                    'id': 7,
                    'name': 'hhhhh',
                    'note': null,
                    'enable': true,
                    'updateTime': 1520075126000,
                    'createTime': 1520075126000
                },
                'spec': '规格2',
                'priceIn': 44,
                'priceOut': 50.05,
                'provider': 'vvvvv',
                'factory': 'vv',
                'note': 'vv',
                'enable': true,
                'updateTime': 1520075065000,
                'createTime': 1520056966000
            },
            {
                'id': 18,
                'name': '产品3',
                'type': {
                    'id': 6,
                    'name': '6',
                    'note': null,
                    'enable': true,
                    'updateTime': 1520075092000,
                    'createTime': 1520075092000
                },
                'spec': '规格3',
                'priceIn': 4,
                'priceOut': 4.5,
                'provider': '6',
                'factory': '6',
                'note': '6',
                'enable': true,
                'updateTime': 1520300073000,
                'createTime': 1520300073000
            },
            {
                'id': 19,
                'name': '产品4',
                'type': {
                    'id': 6,
                    'name': '6',
                    'note': null,
                    'enable': true,
                    'updateTime': 1520075092000,
                    'createTime': 1520075092000
                },
                'spec': '规格4',
                'priceIn': 4,
                'priceOut': 4.5,
                'provider': '6',
                'factory': '6',
                'note': '6',
                'enable': true,
                'updateTime': 1520300181000,
                'createTime': 1520300181000
            },
            {
                'id': 21,
                'name': '产品5',
                'type': {
                    'id': 7,
                    'name': 'hhhhh',
                    'note': null,
                    'enable': true,
                    'updateTime': 1520075126000,
                    'createTime': 1520075126000
                },
                'spec': '规格5',
                'priceIn': 4,
                'priceOut': 4.5,
                'provider': '6',
                'factory': '6',
                'note': '6',
                'enable': true,
                'updateTime': 1520300221000,
                'createTime': 1520300221000
            }
        ]
    };
}

function getTypeList(): Result {
    return {
        'code': 0,
        'msg': '成功',
        'data': [
            {
                'id': 6,
                'name': '6',
                'note': null,
                'enable': true,
                'updateTime': 1520075092000,
                'createTime': 1520075092000
            },
            {
                'id': 7,
                'name': 'hhhhh',
                'note': null,
                'enable': true,
                'updateTime': 1520075126000,
                'createTime': 1520075126000
            }
        ]
    }

            ;
}

function addProduct(entity: Product): Result {
    entity.id = Math.random();
    return {
        'code': 0,
        'msg': '成功',
        'data': entity
    };
}

function addType(entity: Type): Result {
    entity.id = Math.random();
    return {
        'code': 0,
        'msg': '成功',
        'data': entity
    };
}

function updateProduct(entity: Product): Result {
    return {
        'code': 0,
        'msg': '成功',
        'data': entity
    };
}

function updateType(entity: Type): Result {
    return {
        'code': 0,
        'msg': '成功',
        'data': entity
    };
}

function del (req: MockRequest) {
    return {'code': 0, 'msg': '成功', 'data': req.params };
}

export const PRODUCT = {
    'GET /server/product': () => getProductList(),
    'GET /server/type': () => getTypeList(),
    'POST /server/product': (req: MockRequest) => addProduct(req.body),
    'POST /server/type': (req: MockRequest) => addType(req.body),
    'PUT /server/product': (req: MockRequest) => updateProduct(req.body),
    'PUT /server/type': (req: MockRequest) => updateType(req.body),
    'DELETE /server/product/:id': (req: MockRequest) => del(req),
    'DELETE /server/type/:id': (req: MockRequest) => del(req)
};

