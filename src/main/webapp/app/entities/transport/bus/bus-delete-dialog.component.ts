import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBus } from 'app/shared/model/transport/bus.model';
import { BusService } from './bus.service';

@Component({
  templateUrl: './bus-delete-dialog.component.html',
})
export class BusDeleteDialogComponent {
  bus?: IBus;

  constructor(protected busService: BusService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.busService.delete(id).subscribe(() => {
      this.eventManager.broadcast('busListModification');
      this.activeModal.close();
    });
  }
}
