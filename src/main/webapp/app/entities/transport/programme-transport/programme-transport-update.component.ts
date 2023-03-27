import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IProgrammeTransport, ProgrammeTransport } from 'app/shared/model/transport/programme-transport.model';
import { ProgrammeTransportService } from './programme-transport.service';
import { IGroupeTransport } from 'app/shared/model/transport/groupe-transport.model';
import { GroupeTransportService } from 'app/entities/transport/groupe-transport/groupe-transport.service';
import { IBus } from 'app/shared/model/transport/bus.model';
import { BusService } from 'app/entities/transport/bus/bus.service';

type SelectableEntity = IGroupeTransport | IBus;

@Component({
  selector: 'jhi-programme-transport-update',
  templateUrl: './programme-transport-update.component.html',
})
export class ProgrammeTransportUpdateComponent implements OnInit {
  isSaving = false;
  groupetransports: IGroupeTransport[] = [];
  buses: IBus[] = [];
  dateDepartDp: any;

  editForm = this.fb.group({
    id: [],
    heurDepart: [null, [Validators.required]],
    dateDepart: [null, [Validators.required]],
    groupeTransport: [],
    bus: [],
  });

  constructor(
    protected programmeTransportService: ProgrammeTransportService,
    protected groupeTransportService: GroupeTransportService,
    protected busService: BusService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ programmeTransport }) => {
      if (!programmeTransport.id) {
        const today = moment().startOf('day');
        programmeTransport.heurDepart = today;
      }

      this.updateForm(programmeTransport);

      this.groupeTransportService.query().subscribe((res: HttpResponse<IGroupeTransport[]>) => (this.groupetransports = res.body || []));

      this.busService.query().subscribe((res: HttpResponse<IBus[]>) => (this.buses = res.body || []));
    });
  }

  updateForm(programmeTransport: IProgrammeTransport): void {
    this.editForm.patchValue({
      id: programmeTransport.id,
      heurDepart: programmeTransport.heurDepart ? programmeTransport.heurDepart.format(DATE_TIME_FORMAT) : null,
      dateDepart: programmeTransport.dateDepart,
      groupeTransport: programmeTransport.groupeTransport?.id,
      bus: programmeTransport.bus?.id,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const programmeTransport = this.createFromForm();
    if (programmeTransport.id !== undefined) {
      this.subscribeToSaveResponse(this.programmeTransportService.update(programmeTransport));
    } else {
      this.subscribeToSaveResponse(this.programmeTransportService.create(programmeTransport));
    }
  }

  private createFromForm(): IProgrammeTransport {
    return {
      ...new ProgrammeTransport(),
      id: this.editForm.get(['id'])!.value,
      heurDepart: this.editForm.get(['heurDepart'])!.value ? moment(this.editForm.get(['heurDepart'])!.value, DATE_TIME_FORMAT) : undefined,
      dateDepart: this.editForm.get(['dateDepart'])!.value,
      groupeTransport: this.editForm.get(['groupeTransport'])!.value,
      bus: this.editForm.get(['bus'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProgrammeTransport>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
