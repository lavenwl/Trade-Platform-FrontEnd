import {Company} from '../company/company.entity';
import {Role} from '../role/role.entity';

export class User {
    id: number;
    name: string;
    password: string;
    roleList: Array<Role> = [];
    company = new Company();
    phone: string;
    note: string;
    updateTime: number;
    createTime: number;
    enable: boolean;
}
