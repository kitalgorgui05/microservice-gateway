import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReglement } from 'app/shared/model/paiementdb/reglement.model';
import { ReglementService } from './reglement.service';

@Component({
  templateUrl: './reglement-delete-dialog.component.html',
})
export class ReglementDeleteDialogComponent {
  reglement?: IReglement;

  constructor(protected reglementService: ReglementService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.reglementService.delete(id).subscribe(() => {
      this.eventManager.broadcast('reglementListModification');
      this.activeModal.close();
    });
  }
}
