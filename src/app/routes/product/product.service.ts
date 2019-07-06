import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from './product/product.entity';
import {Type} from './type/type.entity';

@Injectable()
export class ProductService {
    constructor(
        private http: HttpClient
    ) { }

    /**
     * 获取产品列表
     * @returns {Observable<Object>}
     */
    loadProductList() {
        return this.http.get('/server/product');
    }

    /**
     * 获取产品类型列表
     * @returns {Observable<Object>}
     */
    loadTypeList() {
        return this.http.get('/server/type');
    }

    /**
     * 新增产品
     * @param {Product} product
     * @returns {Observable<Object>}
     */
    addProduct(entity: Product) {
        return this.http.post('/server/product', entity);
    }

    /**
     * 新增产品类型
     * @param {Type} entity
     * @returns {Observable<Object>}
     */
    addType(entity: Type) {
        return this.http.post('/server/type', entity);
    }

    /**
     * 修改产品
     * @param {Product} product
     * @returns {Observable<Object>}
     */
    updateProduct(entity: Product) {
        return this.http.put('/server/product', entity);
    }

    /**
     * 修改产品类型
     * @param {Type} entity
     * @returns {Observable<Object>}
     */
    updateType(entity: Type) {
        return this.http.put('/server/type', entity);
    }

    /**
     * 删除产品
     * @param {number} id
     * @returns {Observable<Object>}
     */
    deleteProduct(id: number) {
        return this.http.delete('/server/product/' + id );
    }

    /**
     * 删除产品类型
     * @param {number} id
     * @returns {Observable<Object>}
     */
    deleteType(id: number) {
        return this.http.delete('/server/type/' + id );
    }
}
