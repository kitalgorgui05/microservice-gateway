import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { BusComponent } from './bus.component';
import { BusDetailComponent } from './bus-detail.component';
import { BusUpdateComponent } from './bus-update.component';
import { BusDeleteDialogComponent } from './bus-delete-dialog.component';
import { busRoute } from './bus.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(busRoute)],
  declarations: [BusComponent, BusDetailComponent, BusUpdateComponent, BusDeleteDialogComponent],
  entryComponents: [BusDeleteDialogComponent],
})
export class TransportBusModule {}
