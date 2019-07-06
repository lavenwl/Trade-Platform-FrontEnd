import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { TypeComponent } from './type/type.component';
import { ProductComponent } from './product/product.component';
import {ProductService} from './product.service';
import {ProductModalComponent} from './product/productModal.component';
import {TypeModalComponent} from './type/typeModal.component';

@NgModule({
  imports: [
    SharedModule,
    ProductRoutingModule
  ],
  providers: [
      ProductService
  ],
  declarations: [
      TypeComponent,
      ProductComponent,
      ProductModalComponent,
      TypeModalComponent
  ],
  entryComponents: [
      ProductModalComponent,
      TypeModalComponent
  ]
})
export class ProductModule { }
