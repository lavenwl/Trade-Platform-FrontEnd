import {Company} from '../system/company/company.entity';
import {Item} from './item.entity';

export class Order {
    id: number;
    type: number;
    purchaseCompany = new Company();
    saleCompany = new Company();
    money: number;
    description: string;
    itemList: Item[];
    updateTime: number;
    createTime: number;
    enable: boolean;
}
