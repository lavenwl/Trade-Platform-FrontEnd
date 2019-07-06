import {Type} from '../type/type.entity';

export class Product {
    id: number;
    name: string;
    type: Type = new Type();
    spec: string;
    priceIn: number;
    priceOut: number;
    stock: number;
    provider: string;
    factory: string;
    note: string;
    updateTime: number;
    createTime: number;
    enable: boolean;


}
