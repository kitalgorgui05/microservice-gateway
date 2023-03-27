import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { HoraireComponent } from './horaire.component';
import { HoraireDetailComponent } from './horaire-detail.component';
import { HoraireUpdateComponent } from './horaire-update.component';
import { HoraireDeleteDialogComponent } from './horaire-delete-dialog.component';
import { horaireRoute } from './horaire.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(horaireRoute)],
  declarations: [HoraireComponent, HoraireDetailComponent, HoraireUpdateComponent, HoraireDeleteDialogComponent],
  entryComponents: [HoraireDeleteDialogComponent],
})
export class CoursHoraireModule {}
