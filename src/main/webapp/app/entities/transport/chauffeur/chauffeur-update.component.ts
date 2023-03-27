import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IChauffeur, Chauffeur } from 'app/shared/model/transport/chauffeur.model';
import { ChauffeurService } from './chauffeur.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-chauffeur-update',
  templateUrl: './chauffeur-update.component.html',
})
export class ChauffeurUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    prenom: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    nom: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    dateNaissance: [null, [Validators.required]],
    lieuNaissance: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    cin: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(14)]],
    telephone: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(12)]],
    adresse: [null, [Validators.required]],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected chauffeurService: ChauffeurService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chauffeur }) => {
      if (!chauffeur.id) {
        const today = moment().startOf('day');
        chauffeur.dateNaissance = today;
      }

      this.updateForm(chauffeur);
    });
  }

  updateForm(chauffeur: IChauffeur): void {
    this.editForm.patchValue({
      id: chauffeur.id,
      prenom: chauffeur.prenom,
      nom: chauffeur.nom,
      dateNaissance: chauffeur.dateNaissance ? chauffeur.dateNaissance.format(DATE_TIME_FORMAT) : null,
      lieuNaissance: chauffeur.lieuNaissance,
      cin: chauffeur.cin,
      telephone: chauffeur.telephone,
      adresse: chauffeur.adresse,
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
    const chauffeur = this.createFromForm();
    if (chauffeur.id !== undefined) {
      this.subscribeToSaveResponse(this.chauffeurService.update(chauffeur));
    } else {
      this.subscribeToSaveResponse(this.chauffeurService.create(chauffeur));
    }
  }

  private createFromForm(): IChauffeur {
    return {
      ...new Chauffeur(),
      id: this.editForm.get(['id'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      dateNaissance: this.editForm.get(['dateNaissance'])!.value
        ? moment(this.editForm.get(['dateNaissance'])!.value, DATE_TIME_FORMAT)
        : undefined,
      lieuNaissance: this.editForm.get(['lieuNaissance'])!.value,
      cin: this.editForm.get(['cin'])!.value,
      telephone: this.editForm.get(['telephone'])!.value,
      adresse: this.editForm.get(['adresse'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChauffeur>>): void {
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
