import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { CompanyComponent } from './company/company.component';
import { UserComponent } from './user/user.component';
import {CompanyModalComponent} from './company/companyModal.component';
import {SystemService} from './system.service';
import { RoleComponent } from './role/role.component';
import {UserModalComponent} from './user/userModal.component';
import {RoleModalComponent} from './role/roleModal.component';

@NgModule({
  imports: [
    SharedModule,
    SystemRoutingModule
  ],
  providers: [
      SystemService
  ],
  declarations: [CompanyComponent, UserComponent, CompanyModalComponent, RoleComponent, UserModalComponent, RoleModalComponent],
  entryComponents: [
      CompanyModalComponent,
      UserModalComponent,
      RoleModalComponent
  ]
})
export class SystemModule { }
