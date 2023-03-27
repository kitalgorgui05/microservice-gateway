import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { ReglementComponent } from './reglement.component';
import { ReglementDetailComponent } from './reglement-detail.component';
import { ReglementUpdateComponent } from './reglement-update.component';
import { ReglementDeleteDialogComponent } from './reglement-delete-dialog.component';
import { reglementRoute } from './reglement.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(reglementRoute)],
  declarations: [ReglementComponent, ReglementDetailComponent, ReglementUpdateComponent, ReglementDeleteDialogComponent],
  entryComponents: [ReglementDeleteDialogComponent],
})
export class PaiementdbReglementModule {}
