import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { AbsenceComponent } from './absence.component';
import { AbsenceDetailComponent } from './absence-detail.component';
import { AbsenceUpdateComponent } from './absence-update.component';
import { AbsenceDeleteDialogComponent } from './absence-delete-dialog.component';
import { absenceRoute } from './absence.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(absenceRoute)],
  declarations: [AbsenceComponent, AbsenceDetailComponent, AbsenceUpdateComponent, AbsenceDeleteDialogComponent],
  entryComponents: [AbsenceDeleteDialogComponent],
})
export class CoursAbsenceModule {}
