import {Product} from '../product/product.entity';

export class Type {
    id: number;
    name: string;
    note: string;
    updateTime: number;
    createTime: number;
    enable: boolean;
    productList: Array<Product>;
}
