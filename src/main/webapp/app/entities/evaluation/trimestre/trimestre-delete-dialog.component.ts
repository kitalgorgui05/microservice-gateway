import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITrimestre } from 'app/shared/model/evaluation/trimestre.model';
import { TrimestreService } from './trimestre.service';

@Component({
  templateUrl: './trimestre-delete-dialog.component.html',
})
export class TrimestreDeleteDialogComponent {
  trimestre?: ITrimestre;

  constructor(protected trimestreService: TrimestreService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.trimestreService.delete(id).subscribe(() => {
      this.eventManager.broadcast('trimestreListModification');
      this.activeModal.close();
    });
  }
}
