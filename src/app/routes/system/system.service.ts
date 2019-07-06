import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Company} from './company/company.entity';
import {User} from "./user/user.entity";
import {Role} from "./role/role.entity";

@Injectable()
export class SystemService {
    constructor(
        private http: HttpClient
    ) { }

    /**
     * 获取公司列表
     * @returns {Observable<Object>}
     */
    loadCompanyList() {
        return this.http.get('/server/company');
    }

    /**
     * 新增公司
     * @param {Company} entity
     * @returns {Observable<Object>}
     */
    addCompany(entity: Company) {
        return this.http.post('/server/company', entity);
    }

    /**
     * 修改公司
     * @param {Product} product
     * @returns {Observable<Object>}
     */
    updateCompany(entity: Company) {
        return this.http.put('/server/company', entity);
    }

    /**
     * 删除公司
     * @param {number} id
     * @returns {Observable<Object>}
     */
    deleteCompany(id: number) {
        return this.http.delete('/server/company/' + id );
    }

    /**
     * 获取用户列表
     * @returns {Observable<Object>}
     */
    loadUserList() {
        return this.http.get('/server/user');
    }

    /**
     * 新增用户
     * @param {Company} entity
     * @returns {Observable<Object>}
     */
    addUser(entity: User) {
        return this.http.post('/server/user', entity);
    }

    /**
     * 修改用户
     * @param {Product} product
     * @returns {Observable<Object>}
     */
    updateUser(entity: User) {
        return this.http.put('/server/user', entity);
    }

    /**
     * 删除用户
     * @param {number} id
     * @returns {Observable<Object>}
     */
    deleteUser(id: number) {
        return this.http.delete('/server/user/' + id );
    }


    /**
     * 获取角色列表
     * @returns {Observable<Object>}
     */
    loadRoleList() {
        return this.http.get('/server/role');
    }

    /**
     * 新增角色
     * @param {Company} entity
     * @returns {Observable<Object>}
     */
    addRole(entity: Role) {
        return this.http.post('/server/role', entity);
    }

    /**
     * 修改角色
     * @param {Product} product
     * @returns {Observable<Object>}
     */
    updateRole(entity: Role) {
        return this.http.put('/server/role', entity);
    }

    /**
     * 删除角色
     * @param {number} id
     * @returns {Observable<Object>}
     */
    deleteRole(id: number) {
        return this.http.delete('/server/role/' + id );
    }
}
