import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGroupeCantine } from 'app/shared/model/cantine/groupe-cantine.model';
import { GroupeCantineService } from './groupe-cantine.service';

@Component({
  templateUrl: './groupe-cantine-delete-dialog.component.html',
})
export class GroupeCantineDeleteDialogComponent {
  groupeCantine?: IGroupeCantine;

  constructor(
    protected groupeCantineService: GroupeCantineService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.groupeCantineService.delete(id).subscribe(() => {
      this.eventManager.broadcast('groupeCantineListModification');
      this.activeModal.close();
    });
  }
}
