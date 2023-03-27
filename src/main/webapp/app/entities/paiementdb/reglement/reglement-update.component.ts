import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IReglement, Reglement } from 'app/shared/model/paiementdb/reglement.model';
import { ReglementService } from './reglement.service';

@Component({
  selector: 'jhi-reglement-update',
  templateUrl: './reglement-update.component.html',
})
export class ReglementUpdateComponent implements OnInit {
  isSaving = false;
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    date: [null, [Validators.required]],
    montantInscription: [null, [Validators.required]],
    mensualite: [null, [Validators.required]],
    montantCantine: [null, [Validators.required]],
    montantTransport: [null, [Validators.required]],
    idNiveau: [null, [Validators.required]],
    idAnnee: [null, [Validators.required]],
  });

  constructor(protected reglementService: ReglementService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reglement }) => {
      this.updateForm(reglement);
    });
  }

  updateForm(reglement: IReglement): void {
    this.editForm.patchValue({
      id: reglement.id,
      date: reglement.date,
      montantInscription: reglement.montantInscription,
      mensualite: reglement.mensualite,
      montantCantine: reglement.montantCantine,
      montantTransport: reglement.montantTransport,
      idNiveau: reglement.idNiveau,
      idAnnee: reglement.idAnnee,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reglement = this.createFromForm();
    if (reglement.id !== undefined) {
      this.subscribeToSaveResponse(this.reglementService.update(reglement));
    } else {
      this.subscribeToSaveResponse(this.reglementService.create(reglement));
    }
  }

  private createFromForm(): IReglement {
    return {
      ...new Reglement(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value,
      montantInscription: this.editForm.get(['montantInscription'])!.value,
      mensualite: this.editForm.get(['mensualite'])!.value,
      montantCantine: this.editForm.get(['montantCantine'])!.value,
      montantTransport: this.editForm.get(['montantTransport'])!.value,
      idNiveau: this.editForm.get(['idNiveau'])!.value,
      idAnnee: this.editForm.get(['idAnnee'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReglement>>): void {
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
