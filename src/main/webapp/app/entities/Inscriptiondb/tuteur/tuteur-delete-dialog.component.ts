import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITuteur } from 'app/shared/model/Inscriptiondb/tuteur.model';
import { TuteurService } from './tuteur.service';

@Component({
  templateUrl: './tuteur-delete-dialog.component.html',
})
export class TuteurDeleteDialogComponent {
  tuteur?: ITuteur;

  constructor(protected tuteurService: TuteurService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tuteurService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tuteurListModification');
      this.activeModal.close();
    });
  }
}
