import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { SalleComponent } from './salle.component';
import { SalleDetailComponent } from './salle-detail.component';
import { SalleUpdateComponent } from './salle-update.component';
import { SalleDeleteDialogComponent } from './salle-delete-dialog.component';
import { salleRoute } from './salle.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(salleRoute)],
  declarations: [SalleComponent, SalleDetailComponent, SalleUpdateComponent, SalleDeleteDialogComponent],
  entryComponents: [SalleComponent, SalleDetailComponent, SalleUpdateComponent,SalleDeleteDialogComponent],
})
export class ImmoblierSalleModule {}
