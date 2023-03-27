import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IEleve, Eleve } from 'app/shared/model/Inscriptiondb/eleve.model';
import { EleveService } from './eleve.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ITuteur } from 'app/shared/model/Inscriptiondb/tuteur.model';
import { TuteurService } from 'app/entities/Inscriptiondb/tuteur/tuteur.service';

@Component({
  selector: 'jhi-eleve-update',
  templateUrl: './eleve-update.component.html',
})
export class EleveUpdateComponent implements OnInit {
  isSaving = false;
  tuteurs: ITuteur[] = [];
  dateNaissanceDp: any;

  editForm = this.fb.group({
    id: [],
    photo: [],
    photoContentType: [],
    matricule: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    prenom: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    nom: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    sexe: [null, [Validators.required]],
    adresse: [null, [Validators.required]],
    telephone: [null, [Validators.minLength(2), Validators.maxLength(12)]],
    email: [null, []],
    dateNaissance: [null, [Validators.required]],
    lieuNaissance: [null, [Validators.required]],
    tuteur: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected eleveService: EleveService,
    protected tuteurService: TuteurService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ eleve }) => {
      this.updateForm(eleve);

      this.tuteurService.query().subscribe((res: HttpResponse<ITuteur[]>) => (this.tuteurs = res.body || []));
    });
  }

  updateForm(eleve: IEleve): void {
    this.editForm.patchValue({
      id: eleve.id,
      photo: eleve.photo,
      photoContentType: eleve.photoContentType,
      matricule: eleve.matricule,
      prenom: eleve.prenom,
      nom: eleve.nom,
      sexe: eleve.sexe,
      adresse: eleve.adresse,
      telephone: eleve.telephone,
      email: eleve.email,
      dateNaissance: eleve.dateNaissance,
      lieuNaissance: eleve.lieuNaissance,
      tuteur: eleve.tuteur?.id,
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

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const eleve = this.createFromForm();
    if (eleve.id !== undefined) {
      this.subscribeToSaveResponse(this.eleveService.update(eleve));
    } else {
      this.subscribeToSaveResponse(this.eleveService.create(eleve));
    }
  }

  private createFromForm(): IEleve {
    return {
      ...new Eleve(),
      id: this.editForm.get(['id'])!.value,
      photoContentType: this.editForm.get(['photoContentType'])!.value,
      photo: this.editForm.get(['photo'])!.value,
      matricule: this.editForm.get(['matricule'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      sexe: this.editForm.get(['sexe'])!.value,
      adresse: this.editForm.get(['adresse'])!.value,
      telephone: this.editForm.get(['telephone'])!.value,
      email: this.editForm.get(['email'])!.value,
      dateNaissance: this.editForm.get(['dateNaissance'])!.value,
      lieuNaissance: this.editForm.get(['lieuNaissance'])!.value,
      tuteur: this.editForm.get(['tuteur'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEleve>>): void {
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

  trackById(index: number, item: ITuteur): any {
    return item.id;
  }
}
