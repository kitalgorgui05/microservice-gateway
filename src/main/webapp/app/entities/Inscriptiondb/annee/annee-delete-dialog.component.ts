import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAnnee } from 'app/shared/model/Inscriptiondb/annee.model';
import { AnneeService } from './annee.service';

@Component({
  templateUrl: './annee-delete-dialog.component.html',
})
export class AnneeDeleteDialogComponent {
  annee?: IAnnee;

  constructor(protected anneeService: AnneeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.anneeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('anneeListModification');
      this.activeModal.close();
    });
  }
}
