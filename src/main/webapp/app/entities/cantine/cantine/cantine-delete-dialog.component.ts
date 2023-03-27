import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICantine } from 'app/shared/model/cantine/cantine.model';
import { CantineService } from './cantine.service';

@Component({
  templateUrl: './cantine-delete-dialog.component.html',
})
export class CantineDeleteDialogComponent {
  cantine?: ICantine;

  constructor(protected cantineService: CantineService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cantineService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cantineListModification');
      this.activeModal.close();
    });
  }
}
