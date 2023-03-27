import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGroupeTransport } from 'app/shared/model/transport/groupe-transport.model';
import { GroupeTransportService } from './groupe-transport.service';

@Component({
  templateUrl: './groupe-transport-delete-dialog.component.html',
})
export class GroupeTransportDeleteDialogComponent {
  groupeTransport?: IGroupeTransport;

  constructor(
    protected groupeTransportService: GroupeTransportService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.groupeTransportService.delete(id).subscribe(() => {
      this.eventManager.broadcast('groupeTransportListModification');
      this.activeModal.close();
    });
  }
}
