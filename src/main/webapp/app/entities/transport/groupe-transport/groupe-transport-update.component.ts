import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGroupeTransport, GroupeTransport } from 'app/shared/model/transport/groupe-transport.model';
import { GroupeTransportService } from './groupe-transport.service';
import { IZone } from 'app/shared/model/transport/zone.model';
import { ZoneService } from 'app/entities/transport/zone/zone.service';

@Component({
  selector: 'jhi-groupe-transport-update',
  templateUrl: './groupe-transport-update.component.html',
})
export class GroupeTransportUpdateComponent implements OnInit {
  isSaving = false;
  zones: IZone[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    nombreEleves: [null, [Validators.required]],
    etat: [],
    zones: [null, Validators.required],
  });

  constructor(
    protected groupeTransportService: GroupeTransportService,
    protected zoneService: ZoneService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ groupeTransport }) => {
      this.updateForm(groupeTransport);

      this.zoneService.query().subscribe((res: HttpResponse<IZone[]>) => (this.zones = res.body || []));
    });
  }

  updateForm(groupeTransport: IGroupeTransport): void {
    this.editForm.patchValue({
      id: groupeTransport.id,
      nom: groupeTransport.nom,
      nombreEleves: groupeTransport.nombreEleves,
      zones: groupeTransport.zones,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const groupeTransport = this.createFromForm();
    if (groupeTransport.id !== undefined) {
      this.subscribeToSaveResponse(this.groupeTransportService.update(groupeTransport));
    } else {
      this.subscribeToSaveResponse(this.groupeTransportService.create(groupeTransport));
    }
  }

  private createFromForm(): IGroupeTransport {
    return {
      ...new GroupeTransport(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      nombreEleves: this.editForm.get(['nombreEleves'])!.value,
      zones: this.editForm.get(['zones'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGroupeTransport>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IZone): any {
    return item.id;
  }

  getSelected(selectedVals: IZone[], option: IZone): IZone {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
