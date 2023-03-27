import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChauffeur } from 'app/shared/model/transport/chauffeur.model';
import { ChauffeurService } from './chauffeur.service';

@Component({
  templateUrl: './chauffeur-delete-dialog.component.html',
})
export class ChauffeurDeleteDialogComponent {
  chauffeur?: IChauffeur;

  constructor(protected chauffeurService: ChauffeurService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.chauffeurService.delete(id).subscribe(() => {
      this.eventManager.broadcast('chauffeurListModification');
      this.activeModal.close();
    });
  }
}
