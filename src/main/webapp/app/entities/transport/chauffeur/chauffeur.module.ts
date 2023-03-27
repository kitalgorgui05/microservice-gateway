import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { ChauffeurComponent } from './chauffeur.component';
import { ChauffeurDetailComponent } from './chauffeur-detail.component';
import { ChauffeurUpdateComponent } from './chauffeur-update.component';
import { ChauffeurDeleteDialogComponent } from './chauffeur-delete-dialog.component';
import { chauffeurRoute } from './chauffeur.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(chauffeurRoute)],
  declarations: [ChauffeurComponent, ChauffeurDetailComponent, ChauffeurUpdateComponent, ChauffeurDeleteDialogComponent],
  entryComponents: [ChauffeurDeleteDialogComponent],
})
export class TransportChauffeurModule {}
