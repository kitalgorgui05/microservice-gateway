import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { CantineComponent } from './cantine.component';
import { CantineDetailComponent } from './cantine-detail.component';
import { CantineUpdateComponent } from './cantine-update.component';
import { CantineDeleteDialogComponent } from './cantine-delete-dialog.component';
import { cantineRoute } from './cantine.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(cantineRoute)],
  declarations: [CantineComponent, CantineDetailComponent, CantineUpdateComponent, CantineDeleteDialogComponent],
  entryComponents: [CantineDeleteDialogComponent],
})
export class CantineCantineModule {}
