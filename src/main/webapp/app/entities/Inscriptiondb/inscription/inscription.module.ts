import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { InscriptionComponent } from './inscription.component';
import { InscriptionDetailComponent } from './inscription-detail.component';
import { InscriptionUpdateComponent } from './inscription-update.component';
import { InscriptionDeleteDialogComponent } from './inscription-delete-dialog.component';
import { inscriptionRoute } from './inscription.route';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(inscriptionRoute), ReactiveFormsModule],
  declarations: [InscriptionComponent, InscriptionDetailComponent, InscriptionUpdateComponent, InscriptionDeleteDialogComponent],
  entryComponents: [InscriptionDeleteDialogComponent],
})
export class InscriptiondbInscriptionModule {}
