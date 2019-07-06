import {MockRequest} from '@delon/mock';
import {User} from 'app/routes/system/user/user.entity';
import {Company} from '../src/app/routes/system/company/company.entity';
import {Result} from '@core/net/Result.entity';
import {Role} from "../src/app/routes/system/role/role.entity";


function getCompanyList(): Result {
    return {
        'code': 0,
        'msg': '成功',
        'data': [
            {
                'id': 6,
                'name': '6',
                'phone': '6',
                'address': '6',
                'note': null,
                'enable': true,
                'updateTime': 1520075092000,
                'createTime': 1520075092000
            }
        ]
    };
}

function getUserList(): Result {
    return {
        'code': 0,
        'msg': '成功',
        'data': [{
            'id': 1,
            'name': 'laven',
            'password': '123456',
            'phone': '15002112267',
            'role': {
                'id': 1,
                'name': '店长',
                'note': '10000000',
                'enable': true,
                'updateTime': null,
                'createTime': null
            },
            'company': {
                'id': 2,
                'name': '陈娟公司',
                'note': null,
                'enable': true,
                'updateTime': 1520675293000,
                'createTime': 1520675293000
            },
            'note': null,
            'enable': true,
            'updateTime': null,
            'createTime': null
        }]
    }

    ;
}

function getRoleList(): Result {
    return {
        'code': 0,
        'msg': '成功',
        'data': [{'id': 1, 'name': '店长', 'note': '10000000', 'enable': true, 'updateTime': null, 'createTime': null}]
    };
}

function addCompany(entity: Company): Result {
    entity.id = Math.random();
    return {
        'code': 0,
        'msg': '成功',
        'data': entity
    };
}

function addUser(entity: User): Result {
    entity.id = Math.random();
    return {
        'code': 0,
        'msg': '成功',
        'data': entity
    };
}

function addRole(entity: Role): Result {
    entity.id = Math.random();
    return {
        'code': 0,
        'msg': '成功',
        'data': entity
    };
}

function updateCompany(entity: Company): Result {
    return {
        'code': 0,
        'msg': '成功',
        'data': entity
    };
}

function updateUser(entity: User): Result {
    return {
        'code': 0,
        'msg': '成功',
        'data': entity
    };
}

function updateRole(entity: Role): Result {
    return {
        'code': 0,
        'msg': '成功',
        'data': entity
    };
}

function del (req: MockRequest) {
    return {'code': 0, 'msg': '成功', 'data': req.params };
}

export const SYSTEM = {
    'GET /server/company': () => getCompanyList(),
    'GET /server/user': () => getUserList(),
    'GET /server/role': () => getRoleList(),
    'POST /server/company': (req: MockRequest) => addCompany(req.body),
    'POST /server/user': (req: MockRequest) => addUser(req.body),
    'POST /server/role': (req: MockRequest) => addRole(req.body),
    'PUT /server/company': (req: MockRequest) => updateCompany(req.body),
    'PUT /server/user': (req: MockRequest) => updateUser(req.body),
    'PUT /server/role': (req: MockRequest) => updateRole(req.body),
    'DELETE /server/company/:id': (req: MockRequest) => del(req),
    'DELETE /server/user/:id': (req: MockRequest) => del(req),
    'DELETE /server/role/:id': (req: MockRequest) => del(req)
};

