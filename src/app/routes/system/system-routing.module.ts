import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CompanyComponent} from './company/company.component';
import {UserComponent} from './user/user.component';
import {RoleComponent} from './role/role.component';

const routes: Routes = [
    { path: '', redirectTo: 'company', pathMatch: 'full' },
    { path: 'company', component: CompanyComponent },
    { path: 'user', component: UserComponent },
    { path: 'role', component: RoleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
