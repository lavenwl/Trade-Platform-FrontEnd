import {Product} from '../product/product/product.entity';

export class Item {
    id: number;
    num: number;
    productId: number;
    quantity: number;
    price: number;
    money: number;
    description: string;
    updateTime: number;
    createTime: number;
    enable: boolean;
}
