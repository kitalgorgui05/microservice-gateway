import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { ProgrammeTransportComponent } from './programme-transport.component';
import { ProgrammeTransportDetailComponent } from './programme-transport-detail.component';
import { ProgrammeTransportUpdateComponent } from './programme-transport-update.component';
import { ProgrammeTransportDeleteDialogComponent } from './programme-transport-delete-dialog.component';
import { programmeTransportRoute } from './programme-transport.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(programmeTransportRoute)],
  declarations: [
    ProgrammeTransportComponent,
    ProgrammeTransportDetailComponent,
    ProgrammeTransportUpdateComponent,
    ProgrammeTransportDeleteDialogComponent,
  ],
  entryComponents: [ProgrammeTransportDeleteDialogComponent],
})
export class TransportProgrammeTransportModule {}
