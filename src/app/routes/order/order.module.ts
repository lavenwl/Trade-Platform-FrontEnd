import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';
import { PurchaseComponent } from './purchase/purchase.component';
import { SaleComponent } from './sale/sale.component';
import {OrderModalComponent} from './orderModal.component';
import {OrderService} from './order.service';
import {SystemService} from '../system/system.service';
import {ProductService} from '../product/product.service';
import { EssenceNg2PrintModule } from 'essence-ng2-print';

@NgModule({
  imports: [
      SharedModule,
      OrderRoutingModule,
      EssenceNg2PrintModule
  ],
  providers: [OrderService, SystemService, ProductService],
  declarations: [PurchaseComponent, SaleComponent, OrderModalComponent],
  entryComponents: [
      OrderModalComponent
  ]
})
export class OrderModule { }
