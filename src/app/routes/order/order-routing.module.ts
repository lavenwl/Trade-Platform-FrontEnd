import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PurchaseComponent} from './purchase/purchase.component';
import {SaleComponent} from './sale/sale.component';

const routes: Routes = [
    { path: '', redirectTo: 'sale', pathMatch: 'full' },
    { path: 'purchase', component: PurchaseComponent },
    { path: 'sale', component: SaleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
