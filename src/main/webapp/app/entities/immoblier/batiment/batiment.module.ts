import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { BatimentComponent } from './batiment.component';
import { BatimentDetailComponent } from './batiment-detail.component';
import { BatimentUpdateComponent } from './batiment-update.component';
import { BatimentDeleteDialogComponent } from './batiment-delete-dialog.component';
import { batimentRoute } from './batiment.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(batimentRoute)],
  declarations: [BatimentComponent, BatimentDetailComponent, BatimentUpdateComponent, BatimentDeleteDialogComponent],
  entryComponents: [BatimentDeleteDialogComponent],
})
export class ImmoblierBatimentModule {}
