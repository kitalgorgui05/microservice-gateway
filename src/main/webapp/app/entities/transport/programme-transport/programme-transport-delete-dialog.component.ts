import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProgrammeTransport } from 'app/shared/model/transport/programme-transport.model';
import { ProgrammeTransportService } from './programme-transport.service';

@Component({
  templateUrl: './programme-transport-delete-dialog.component.html',
})
export class ProgrammeTransportDeleteDialogComponent {
  programmeTransport?: IProgrammeTransport;

  constructor(
    protected programmeTransportService: ProgrammeTransportService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.programmeTransportService.delete(id).subscribe(() => {
      this.eventManager.broadcast('programmeTransportListModification');
      this.activeModal.close();
    });
  }
}
