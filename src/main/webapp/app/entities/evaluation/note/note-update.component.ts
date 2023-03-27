import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { INote, Note } from 'app/shared/model/evaluation/note.model';
import { NoteService } from './note.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IEvaluation } from 'app/shared/model/evaluation/evaluation.model';
import { EvaluationService } from 'app/entities/evaluation/evaluation/evaluation.service';
import {EleveService} from "../../Inscriptiondb/eleve/eleve.service";
import {IEleve} from "../../../shared/model/Inscriptiondb/eleve.model";

@Component({
  selector: 'jhi-note-update',
  templateUrl: './note-update.component.html',
})
export class NoteUpdateComponent implements OnInit {
  isSaving = false;
  evaluations: IEvaluation[] = [];
  eleves?:IEleve[] |null;

  editForm = this.fb.group({
    id: [],
    note: [null, [Validators.required]],
    eleve: [null, [Validators.required]],
    apperciation: [null, [Validators.required]],
    evaluation: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected noteService: NoteService,
    protected evaluationService: EvaluationService,
    protected eleveService: EleveService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ note }) => {
      this.updateForm(note);

      this.evaluationService.query().subscribe((res: HttpResponse<IEvaluation[]>) => (this.evaluations = res.body || []));
    });
    this.eleveService.query().subscribe(
      {
        next:(data)=>{
          this.eleves=data.body;
        }
      });
  }

  updateForm(note: INote): void {
    this.editForm.patchValue({
      id: note.id,
      note: note.note,
      eleve: note.eleve,
      apperciation: note.apperciation,
      evaluation: note.evaluation?.id,
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
    const note = this.createFromForm();
    if (note.id !== undefined) {
      this.subscribeToSaveResponse(this.noteService.update(note));
    } else {
      this.subscribeToSaveResponse(this.noteService.create(note));
    }
  }

  private createFromForm(): INote {
    return {
      ...new Note(),
      id: this.editForm.get(['id'])!.value,
      note: this.editForm.get(['note'])!.value,
      eleve: this.editForm.get(['eleve'])!.value,
      apperciation: this.editForm.get(['apperciation'])!.value,
      evaluation: this.editForm.get(['evaluation'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INote>>): void {
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

  trackById(index: number, item: IEvaluation): any {
    return item.id;
  }
  trackByIdEleve(index: number, item: IEleve): any {
    return item.id;
  }
}
