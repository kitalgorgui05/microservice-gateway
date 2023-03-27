import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { AnneeComponent } from './annee.component';
import { AnneeDetailComponent } from './annee-detail.component';
import { AnneeUpdateComponent } from './annee-update.component';
import { AnneeDeleteDialogComponent } from './annee-delete-dialog.component';
import { anneeRoute } from './annee.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(anneeRoute)],
  declarations: [AnneeComponent, AnneeDetailComponent, AnneeUpdateComponent, AnneeDeleteDialogComponent],
  entryComponents: [AnneeDeleteDialogComponent],
})
export class InscriptiondbAnneeModule {}
