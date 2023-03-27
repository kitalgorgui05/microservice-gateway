import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IAbsence, Absence } from 'app/shared/model/cours/absence.model';
import { AbsenceService } from './absence.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ICours } from 'app/shared/model/cours/cours.model';
import { CoursService } from 'app/entities/cours/cours/cours.service';
import {IEleveModel} from "../../../shared/model/cours/classeClient/eleve.model";

@Component({
  selector: 'jhi-absence-update',
  templateUrl: './absence-update.component.html',
})
export class AbsenceUpdateComponent implements OnInit {
  isSaving = false;
  cours: ICours[] = [];
  eleves: IEleveModel[] = [];

  editForm = this.fb.group({
    id: [],
    idEleve: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    motif: [],
    etat: [null, [Validators.required]],
    cours: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected absenceService: AbsenceService,
    protected coursService: CoursService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ absence }) => {
      this.updateForm(absence);

      this.coursService.query().subscribe((res: HttpResponse<ICours[]>) => (this.cours = res.body || []));
    });
    this.getEleves();
  }


  getEleves():any{
    return this.absenceService.getEleves().subscribe({
      next:(data)=>{
        this.eleves=data;
      }
    })
  }
  updateForm(absence: IAbsence): void {
    this.editForm.patchValue({
      id: absence.id,
      idEleve: absence.idEleve,
      motif: absence.motif,
      etat: absence.etat,
      cours: absence.cours?.id,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('gatewayApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const absence = this.createFromForm();
    if (absence.id !== undefined) {
      this.subscribeToSaveResponse(this.absenceService.update(absence));
    } else {
      this.subscribeToSaveResponse(this.absenceService.create(absence));
    }
  }

  private createFromForm(): IAbsence {
    return {
      ...new Absence(),
      id: this.editForm.get(['id'])!.value,
      idEleve: this.editForm.get(['idEleve'])!.value,
      motif: this.editForm.get(['motif'])!.value,
      etat: this.editForm.get(['etat'])!.value,
      cours: this.editForm.get(['cours'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAbsence>>): void {
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

  trackById(index: number, item: ICours): any {
    return item.id;
  }
  trackByIdEleve(index: number, item: IEleveModel): any {
    return item.id;
  }
}
