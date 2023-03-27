import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBatiment } from 'app/shared/model/immoblier/batiment.model';
import { BatimentService } from './batiment.service';

@Component({
  templateUrl: './batiment-delete-dialog.component.html',
})
export class BatimentDeleteDialogComponent {
  batiment?: IBatiment;

  constructor(protected batimentService: BatimentService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.batimentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('batimentListModification');
      this.activeModal.close();
    });
  }
}
