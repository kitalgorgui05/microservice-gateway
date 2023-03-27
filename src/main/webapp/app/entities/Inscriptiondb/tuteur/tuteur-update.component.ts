import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ITuteur, Tuteur } from 'app/shared/model/Inscriptiondb/tuteur.model';
import { TuteurService } from './tuteur.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-tuteur-update',
  templateUrl: './tuteur-update.component.html',
})
export class TuteurUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    prenom: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    nom: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    adresse: [null, [Validators.required]],
    email: [null, [Validators.required]],
    sexe: [null, [Validators.required]],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected tuteurService: TuteurService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tuteur }) => {
      this.updateForm(tuteur);
    });
  }

  updateForm(tuteur: ITuteur): void {
    this.editForm.patchValue({
      id: tuteur.id,
      prenom: tuteur.prenom,
      nom: tuteur.nom,
      adresse: tuteur.adresse,
      email: tuteur.email,
      sexe: tuteur.sexe,
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
    const tuteur = this.createFromForm();
    if (tuteur.id !== undefined) {
      this.subscribeToSaveResponse(this.tuteurService.update(tuteur));
    } else {
      this.subscribeToSaveResponse(this.tuteurService.create(tuteur));
    }
  }

  private createFromForm(): ITuteur {
    return {
      ...new Tuteur(),
      id: this.editForm.get(['id'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      adresse: this.editForm.get(['adresse'])!.value,
      email: this.editForm.get(['email'])!.value,
      sexe: this.editForm.get(['sexe'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITuteur>>): void {
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
}
